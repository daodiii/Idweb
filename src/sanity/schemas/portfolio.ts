import { defineType, defineField } from "sanity";

export const portfolio = defineType({
  name: "portfolio",
  title: "Portefølje",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Prosjektnavn",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "domain",
      title: "Domene",
      type: "string",
      description: "F.eks. 'brobekk.no'",
    }),
    defineField({
      name: "desktopImage",
      title: "Desktop-bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tabletImage",
      title: "Tablet-bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mobileImage",
      title: "Mobil-bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "domain", media: "desktopImage" },
  },
});
