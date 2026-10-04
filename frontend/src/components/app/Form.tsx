import { useState, useRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { post } from "@/lib/api";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

import { useQueryClient } from "@tanstack/react-query";

export const Form = () => {
  const key = useRef("");
  const value = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const postLink = async () => {
    setIsLoading(true);

    const response = await post("/links", { key: key.current, value: value.current });
    if (!response.success) {
      toast.add({ title: response.error });
    } else {
      toast.add({ title: "Link created successfully" });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["links"] });
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>ShortLink form</CardTitle>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="key">Key</FieldLabel>
          <Input
            id="key"
            type="string"
            placeholder=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              key.current = e.target.value
            }
          />
        </Field>
        <Field className="mt-6">
          <FieldLabel htmlFor="url">Url</FieldLabel>
          <Input
            id="url"
            type="string"
            placeholder=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              value.current = e.target.value
            }
          />
        </Field>
        <Button
          onClick={() => postLink()}
          data-icon="inline-start"
          disabled={isLoading}
          className="mt-6 float-right cursor-pointer"
          variant="outline"
        >
          {isLoading && <Spinner />}
          Create
        </Button>
      </CardContent>
    </Card>
  );
};

export default Form;
