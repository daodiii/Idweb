import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Kundeomtale",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Tekst",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Navn",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorHandle",
      title: "Handle / rolle",
      type: "string",
      description: "F.eks. 'Daglig leder' eller '@brukernavn'",
    }),
    defineField({
      name: "company",
      title: "Firma",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Profilbilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Vurdering",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: "href",
      title: "Lenke",
      type: "url",
      description: "Valgfri lenke til kundens nettside",
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "company" },
  },
});
