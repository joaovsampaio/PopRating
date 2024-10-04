"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarRating } from "@/components/ui/StarRating";
import { useEffect, useState } from "react";
import SelectCategory from "@/components/ui/Select";
import CustomToast from "@/components/ui/Toast";
import Loading from "@/components/ui/Loading";
import { Input } from "@/components/ui/Input";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";

const CustomEditor = dynamic(() => import("@/components/ui/CustomEditor"), {
  ssr: false,
});

const schema = z.object({
  title: z.string().min(1, { message: "Esse Campo Deve Ser Preenchido" }),
  cover: z
    .string()
    .url({ message: "URL Inválida" })
    .min(1, { message: "Esse Campo Deve Ser Preenchido" }),
  category: z.string({ required_error: "É Necessário Escolher Uma Categoria" }),
  collection: z.boolean().default(false),
  content: z.string().min(1, { message: "Esse Campo Deve Ser Preenchido" }),
  rating: z.number(),
  published: z.boolean().default(false),
  date: z.string().default(
    Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date())
  ),
});
type FormData = z.infer<typeof schema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => clearErrors("category"), [watch("category")]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      await fetch("/api/crud/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    },
    onSuccess: () => {
      setOpenToast(true);
      setError(false);
    },
    onError: () => {
      setOpenToast(true);
      setError(true);
    },
  });

  return (
    <div className="flex flex-col items-center gap-10 my-10">
      <div className="flex py-3 px-3 justify-center items-center bg-secondary-500 rounded-bl-2xl rounded-tr-2xl">
        <h1 className="text-3xl font-medium uppercase">Novo Artigo</h1>
      </div>

      <form
        onSubmit={handleSubmit((review) => mutation.mutate(review))}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col w-11/12 lg:w-10/12">
          <label className="mb-1 text-2xl" htmlFor="title">
            Insira um título
          </label>
          <Input {...register("title")} id="title" placeholder="título" />
          {errors.title?.message && (
            <span className="text-error-500">{errors.title?.message}</span>
          )}

          <label className="mt-5 mb-1 text-2xl" htmlFor="cover">
            Capa da matéria
          </label>
          <Input
            {...register("cover")}
            id="cover"
            placeholder="url"
            type="url"
          />
          {errors.cover?.message && (
            <span className="text-error-500">{errors.cover?.message}</span>
          )}

          <div className="flex flex-col w-fit">
            <label className="mt-5 mb-1 text-2xl">
              Selecione Uma Categoria
            </label>

            <SelectCategory
              setSelectCategory={(category: string) =>
                setValue("category", category)
              }
            />

            {errors.category?.message && (
              <span className="text-error-500">{errors.category?.message}</span>
            )}
          </div>

          <label htmlFor="content" className="mt-5 mb-1 text-2xl">
            {watch("collection") === true ? "Matéria" : "Crítica"}
          </label>
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomEditor value={value} onChange={onChange} />
            )}
          />
          {errors.content?.message && (
            <span className="text-error-500">{errors.content?.message}</span>
          )}

          <fieldset className="flex flex-col mt-5 gap-1">
            <legend className="text-2xl mb-2">Coleção</legend>

            <div>
              <Input
                onClick={() => setValue("collection", false)}
                value="no"
                id="no"
                type="radio"
                name="collection"
                className="h-4 w-4 accent-primary-500 focus:ring-2 focus:ring-primary"
                defaultChecked
              />
              <label
                htmlFor="no"
                className="text-neutral-100 text-base font-medium ml-2"
              >
                Não
              </label>
            </div>
            <div>
              <Input
                onClick={() => setValue("collection", true)}
                value="yes"
                id="yes"
                type="radio"
                name="collection"
                className="h-4 w-4 accent-primary-500 focus:ring-2 focus:ring-primary"
              />
              <label
                htmlFor="yes"
                className="text-neutral-100 text-base font-medium ml-2"
              >
                Sim
              </label>
            </div>
          </fieldset>

          <div
            className="flex flex-col gap-2 my-3"
            style={{
              display: watch("collection") === true ? "none" : "block",
            }}
          >
            <label className="text-2xl">Escolha uma nota</label>
            <StarRating
              setStarRating={(rating: number) => setValue("rating", rating)}
            />
          </div>

          <fieldset className="flex flex-col mt-5 gap-1">
            <legend className="text-2xl mb-2">Publicar agora?</legend>

            <div>
              <Input
                onClick={() => setValue("published", false)}
                value="no"
                id="no"
                type="radio"
                name="published"
                className="h-4 w-4 accent-primary-500 focus:ring-2 focus:ring-primary"
                defaultChecked
              />
              <label
                htmlFor="no"
                className="text-neutral-100 text-base font-medium ml-2"
              >
                Não
              </label>
            </div>
            <div>
              <Input
                onClick={() => setValue("published", true)}
                value="yes"
                id="yes"
                type="radio"
                name="published"
                className="h-4 w-4 accent-primary-500 focus:ring-2 focus:ring-primary"
              />
              <label
                htmlFor="yes"
                className="text-neutral-100 text-base font-medium ml-2"
              >
                Sim
              </label>
            </div>
          </fieldset>

          <button
            className="bg-primary-500 hover:bg-primary-700 text-lg flex justify-center self-center w-1/3 py-1 my-5 rounded-lg disabled:cursor-not-allowed disabled:bg-primary-800"
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? <Loading /> : "Publicar"}
          </button>

          <CustomToast
            title={getValues().title}
            description="Enviado Ao Banco De Dados"
            open={openToast}
            setOpen={setOpenToast}
            error={error}
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
