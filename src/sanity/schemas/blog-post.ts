import { defineType, defineField, defineArrayMember } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blogginnlegg",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Utdrag",
      type: "text",
      rows: 3,
      description: "Kort beskrivelse som vises i blogg-listen",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta-beskrivelse",
      type: "text",
      rows: 2,
      description: "SEO-beskrivelse for Google (maks 160 tegn)",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "publishedDate",
      title: "Publiseringsdato",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Lesetid",
      type: "string",
      description: "F.eks. '5 min'",
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Nettsider", value: "Nettsider" },
          { title: "SEO", value: "SEO" },
          { title: "Design", value: "Design" },
          { title: "Vedlikehold", value: "Vedlikehold" },
          { title: "Markedsføring", value: "Markedsføring" },
        ],
      },
    }),
    defineField({
      name: "sections",
      title: "Seksjoner",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "blogSection",
          title: "Seksjon",
          fields: [
            defineField({
              name: "heading",
              title: "Overskrift",
              type: "string",
            }),
            defineField({
              name: "paragraphs",
              title: "Avsnitt",
              type: "array",
              of: [defineArrayMember({ type: "text" })],
            }),
            defineField({
              name: "listItems",
              title: "Punktliste",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", date: "publishedDate", category: "category" },
    prepare({ title, date, category }) {
      return {
        title,
        subtitle: `${category ?? ""} — ${date ?? "Utkast"}`,
      };
    },
  },
});
