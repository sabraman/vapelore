"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";

const FormSchema = z.object({
  brand: z
    .string({
      required_error: "Название бренда обязательно",
      invalid_type_error: "Бренд не должен состоять только из чисел",
    })
    .max(256)
    .min(1),
  model: z
    .string({
      required_error: "Название модели обязательно",
      invalid_type_error: "Модель не должна состоять только из чисел",
    })
    .max(256)
    .min(1),
  puffs: z
    .number({
      required_error: "Кол-во затяжек обязательно",
      invalid_type_error: "Кол-во затяжек должно быть числом",
    })
    .int()
    .min(1),
  strength: z
    .string({
      required_error: "Указание крепкости обязательна",
      invalid_type_error: "Крепкость должна быть строкой",
    })
    .max(20)
    .min(1),
  puffType: z
    .string({
      required_error: "Указание типа затяжек обязательно",
      invalid_type_error: "Тип затяжки должна быть строкой",
    })
    .max(20)
    .min(1),
  taste: z
    .string({
      required_error: "Указание вкусопередачи обязательно",
      invalid_type_error: "Вкусопередача должна быть строкой",
    })
    .max(20)
    .min(1),
  charge: z
    .string({
      required_error: "Указание типа заряда обязательно",
      invalid_type_error: "Тип зарядки должна быть строкой",
    })
    .max(20)
    .min(1),
  liqVolume: z
    .number({
      required_error: "Указание кол-ва жидкости обязательно",
      invalid_type_error: "Кол-во жидкости должно быть числом",
    })
    .int()
    .min(1),
  capacity: z
    .number({
      required_error: "Указание объема аккумулятора обязательна",
      invalid_type_error: "Объем аккумулятора должен быть числом",
    })
    .int()
    .min(1),
  display: z
    .string({
      required_error: "Указание наличия дисплея обязательно",
      invalid_type_error: "Наличие дисплея должно быть строкой",
    })
    .max(128)
    .min(1),
  features: z
    .string({
      invalid_type_error: "Особенности должны быть строкой",
    })
    .max(512),
});

export function AddPostForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(
      <div>
        <span>You submitted the following values:</span>

        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>,
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your brand name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your model name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="puffs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puffs</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your number of puffs.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="strength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taste"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taste</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your taste.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="charge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charge</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your charge.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your capacity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="display"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your display.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Your features.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
