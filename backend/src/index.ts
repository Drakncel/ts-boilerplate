import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { isValidHttpUrl, isValidKey } from "./validation.js";
import { proxy } from "hono/proxy";
import { zValidator } from "@hono/zod-validator";
import * as z from "zod";
import { getCount, getLinkByKey, getLinkPage, getMagic, initDB, insertLink, insertMagic, seedDB } from "./repo.js";
import { PAGE_SIZE } from "./constants.js";
import { delay, randInt } from "./utils.js";

initDB();

export const app = new Hono();

// API
app.use("/api/*", cors());

app.get("/api", (c) => {
  return c.text("Hello Hono!");
});

app.post(
  "/api/links",
  zValidator(
    "json",
    z.object({
      key: z.string(),
      value: z.string(),
    }),
  ),
  async (c) => {
    const body = await c.req.valid("json");

    if (!isValidHttpUrl(body.value)) {
      throw new HTTPException(400, { message: "Bad Request" });
    }

    if (!isValidKey(body.key)) {
      throw new HTTPException(400, { message: "Bad Request" });
    }

    const result = getLinkByKey(body.key)

    if (result) {
      throw new HTTPException(400, { message: "Bad Request" });
    }

    try {
      await insertLink(body)
  
      c.status(201);
      return c.json(body);
    } catch {
      throw new HTTPException(500, { message: "An unexpected error occured" });
    }
  },
);

app.get("/api/links/pages", (c) => {
  const result = getCount()

  if (result && "count" in result) {
    c.status(200);
    return c.json({
      pages: Math.ceil(Number(result.count) / PAGE_SIZE),
    });
  }

  throw new HTTPException(500, { message: "An unexpected error has occured" });
});

app.get(
  "/api/links",
  zValidator(
    "query",
    z.object({
      page: z.coerce.number().int().min(1).default(1),
    }),
  ),
  (c) => {
    const { page } = c.req.valid("query");
    const result = getLinkPage(page)

    c.status(200);
    return c.json(result);
  },
);

app.post("/api/links/seed", (c) => {

  seedDB()

  c.status(201);
  return c.json({ message: "Done" });
});

// MAGIC
app.get(
  "/api/magic",
  (c) => {
    const result = getMagic()

    c.status(200);
    return c.json(result);
  },
);

app.post(
  "/api/magic",
  async (c) => {
    try {
      // MAGIC TAKES TIME !
      await delay(2000)

      // MAGIC SOMETIMES FAIL UNEXPECTEDLY
      const i = randInt(10)
      if (i <= 1) {
        throw new HTTPException(418, { message: "An unexpected gnome stole your magic" });
      }

      if (i <= 2) {
        throw new HTTPException(418, { message: "An unexpected wizard redirected your magic elsewhere" });
      }

      await insertMagic()
  
      c.status(201);
      return c.text('Created')
    } catch {
      throw new HTTPException(500, { message: "An unexpected error occured" });
    }
  },
);

// FRONTEND
app.get("/app", (c) => c.redirect("/app/"));

app.all("/app/*", async (c) =>
  proxy(`http://localhost:5173${c.req.path}`, c.req.raw),
);

// REDIRECTION
app.get("/:key", async (c) => {
  const key = c.req.param("key");
  if (!isValidKey(key)) {
    throw new HTTPException(400, { message: "Bad Request" });
  }

  const result = getLinkByKey(key)

  if (!result) {
    throw new HTTPException(404, { message: "Not Found" });
  }

  if (!("value" in result)) {
    throw new HTTPException(404, { message: "Not Found" });
  }

  c.status(403);
  return c.redirect(result.value);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
