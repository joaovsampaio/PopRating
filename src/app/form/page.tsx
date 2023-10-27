"use client";

import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarRating } from "@/components/ui/StarRating";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useRef, useState } from "react";
import SelectCategory from "@/components/ui/Select";
import dynamic from "next/dynamic";
import CustomToast from "@/components/ui/Toast";
import Loading from "@/components/ui/Loading";
import BtnLogin from "@/components/ui/BtnLogin";
import { useSession } from "next-auth/react";

const Editor = dynamic(() => import("@/components/ui/Editor"), {
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
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [openToast, setOpenToast] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { data: session } = useSession();

  useEffect(() => clearErrors("category"), [watch("category")]);
  const editorRef = useRef(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      await fetch("/api/crud/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      setIsLoading(false);
      setOpenToast(true);
      setError(false);
    } catch (e) {
      setIsLoading(false);
      setOpenToast(true);
      setError(true);
    }
  };

  if (!session?.user?.email) {
    return (
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center items-center gap-10 h-screen">
          <p className="text-light/90 text-lg text-center font-medium">
            É necessário uma conta
          </p>
          <BtnLogin />
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <main className="my-10">
      <MaxWidthWrapper className="flex flex-col items-center gap-10">
        <div className="flex py-3 px-3 justify-center items-center bg-secondary rounded-bl-2xl rounded-tr-2xl">
          <h1 className="text-3xl font-medium uppercase">Novo Artigo</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full"
        >
          <div className="flex flex-col w-2/4 max-lg:w-11/12">
            <label className="mb-1 text-2xl" htmlFor="title">
              Insira um título
            </label>
            <input
              {...register("title")}
              id="title"
              placeholder="título"
              className="border-primary rounded-sm border p-1 mt-2 text-2xl text-dark"
            />
            {errors.title?.message && (
              <span className="text-red-500">{errors.title?.message}</span>
            )}

            <label className="mt-5 mb-1 text-2xl" htmlFor="cover">
              Capa da matéria
            </label>
            <input
              {...register("cover")}
              id="cover"
              placeholder="url"
              className="border-primary rounded-sm border p-1 mt-2 text-2xl text-dark"
            />
            {errors.cover?.message && (
              <span className="text-red-500">{errors.cover?.message}</span>
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
                <span className="text-red-500">{errors.category?.message}</span>
              )}
            </div>

            <label htmlFor="content" className="mt-5 mb-1 text-2xl">
              {watch("collection") === true ? "Matéria" : "Crítica"}
            </label>
            <Editor
              onChange={(_, editor) => setValue("content", editor.getContent())}
              editorRef={editorRef}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "checklist",
                  "lists",
                  "link",
                  "image",
                  "preview",
                  "searchreplace",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "help",
                  "code",
                ],
                toolbar:
                  "undo redo | casechange blocks | bold italic backcolor | fullscreen preview|" +
                  "alignleft aligncenter alignright alignjustify| " +
                  "link media image | " +
                  "bullist numlist checklist outdent indent | removeformat | searchreplace code help",
              }}
            />
            {errors.content?.message && (
              <span className="text-red-500">{errors.content?.message}</span>
            )}

            <fieldset className="flex flex-col mt-5 gap-1">
              <legend className="text-2xl mb-2">Coleção</legend>

              <div>
                <input
                  onClick={() => setValue("collection", false)}
                  value="no"
                  id="no"
                  type="radio"
                  name="collection"
                  className="h-4 w-4 border-primary focus:ring-2 focus:ring-primary"
                  defaultChecked
                />
                <label
                  htmlFor="no"
                  className="text-light text-base font-medium ml-2"
                >
                  Não
                </label>
              </div>
              <div>
                <input
                  onClick={() => setValue("collection", true)}
                  value="yes"
                  id="yes"
                  type="radio"
                  name="collection"
                  className="h-4 w-4 border-primary focus:ring-2 focus:ring-primary"
                />
                <label
                  htmlFor="yes"
                  className="text-light text-base font-medium ml-2"
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
                <input
                  onClick={() => setValue("published", false)}
                  value="no"
                  id="no"
                  type="radio"
                  name="published"
                  className="h-4 w-4 border-primary focus:ring-2 focus:ring-primary"
                  defaultChecked
                />
                <label
                  htmlFor="no"
                  className="text-light text-base font-medium ml-2"
                >
                  Não
                </label>
              </div>
              <div>
                <input
                  onClick={() => setValue("published", true)}
                  value="yes"
                  id="yes"
                  type="radio"
                  name="published"
                  className="h-4 w-4 border-primary focus:ring-2 focus:ring-primary"
                />
                <label
                  htmlFor="yes"
                  className="text-light text-base font-medium ml-2"
                >
                  Sim
                </label>
              </div>
            </fieldset>

            <button
              className="bg-primary hover:bg-primary/80 text-lg flex justify-center self-center w-1/3 py-1 my-5 rounded-lg disabled:cursor-not-allowed disabled:bg-primary/80"
              disabled={isloading}
              type="submit"
            >
              {isloading ? <Loading /> : "Publicar"}
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
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;
