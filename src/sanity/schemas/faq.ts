import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Spørsmål",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Svar",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Generelt", value: "generelt" },
          { title: "Priser", value: "priser" },
          { title: "Nettsider", value: "nettsider" },
          { title: "SEO", value: "seo" },
          { title: "Vedlikehold", value: "vedlikehold" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Rekkefølge",
      type: "number",
      description: "Lavere tall vises først",
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
});
