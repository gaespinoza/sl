"use client";
import {
  JsonInput,
  Button,
  Group,
  Collapse,
  Box,
  Code,
  Text,
  Paper,
  Badge,
} from "@mantine/core";
import { Spinner } from "@nextui-org/spinner";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  validInputExample,
  requestSchema,
} from "@/components/input/requestType";
import { useEffect, useState } from "react";

export default function Add() {
  const [opened, { toggle }] = useDisclosure(false);
  const [upload, setUpload] = useState(false);
  const [renderResponse, setRenderResponse] = useState({
    loading: false,
    error: false,
    response: "",
  });

  const form = useForm({
    initialValues: {
      list: "",
    },
    validate: (values) => ({
      list: requestSchema.validate(JSON.parse(values.list)).error
        ? requestSchema.validate(JSON.parse(values.list)).error?.message
        : null,
    }),
  });

  useEffect(() => {
    async function post() {
      return await fetch("/api/add", {
        method: "POST",
        body: form.values.list,
      });
    }

    if (upload) {
      setUpload(false);
      setRenderResponse({ ...renderResponse, loading: true });
      post().then((response) => {
        let error = false;
        if (response.status == 500) {
          error = true;
        }
        response.text().then((message) => {
          setRenderResponse({
            error: error,
            loading: false,
            response: message,
          });
        });
      });
    }
  }, [form, upload, setUpload, renderResponse, setRenderResponse]);

  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      <div>
        <Box>
          <Group className=" items-center justify-center align-middle">
            <Button onClick={toggle}>View Expected Input</Button>
          </Group>
          <Collapse in={opened}>
            <Code
              block
              className=" max-h-60 items-center justify-center align-middle"
            >
              {validInputExample}
            </Code>
          </Collapse>
        </Box>
      </div>
      <div className="items-center align-middle justify-center w-full">
        <Box>
          <form
            onSubmit={form.onSubmit(() => {
              setUpload(true);
            })}
          >
            <JsonInput
              label="Add Product Information"
              placeholder="Add Product Information"
              validationError="Invalid JSON"
              formatOnBlur
              autosize
              maxRows={10}
              {...form.getInputProps("list")}
            />
            <Group className="items-center align-middle justify-center p-3">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
          <div className="items-center align-middle justify-center">
            {renderResponse.loading ? (
              <Spinner />
            ) : renderResponse.response ? (
              renderResponse.error ? (
                <>
                  <Badge color="red">Error</Badge>
                  <Paper withBorder className="bg-red-300" shadow="xs" p="xl">
                    <Text>{renderResponse.response}</Text>
                  </Paper>
                </>
              ) : (
                <Badge color="green">Success</Badge>
              )
            ) : null}
          </div>
        </Box>
      </div>
    </main>
  );
}
