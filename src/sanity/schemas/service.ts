import { defineType, defineField, defineArrayMember } from "sanity";

export const service = defineType({
  name: "service",
  title: "Tjeneste",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "id",
      title: "ID",
      type: "slug",
      description: "Brukes i URL-en, f.eks. 'nettside'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Kort beskrivelse",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "longDescription",
      title: "Lang beskrivelse",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "categoryTag",
      title: "Kategori-tag",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Funksjoner (kort liste)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "detailedFeatures",
      title: "Detaljerte funksjoner",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "serviceFeature",
          fields: [
            defineField({ name: "iconName", title: "Ikon-navn", type: "string" }),
            defineField({ name: "title", title: "Tittel", type: "string" }),
            defineField({ name: "description", title: "Beskrivelse", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "painPoints",
      title: "Smertepunkter",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "painPoint",
          fields: [
            defineField({ name: "title", title: "Tittel", type: "string" }),
            defineField({ name: "description", title: "Beskrivelse", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "processSteps",
      title: "Prosess-steg",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "processStep",
          fields: [
            defineField({ name: "step", title: "Steg-nummer", type: "number" }),
            defineField({ name: "title", title: "Tittel", type: "string" }),
            defineField({ name: "description", title: "Beskrivelse", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({ name: "question", title: "Spørsmål", type: "string" }),
            defineField({ name: "answer", title: "Svar", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "trustStats",
      title: "Tillits-statistikk",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "trustSignal",
          fields: [
            defineField({ name: "value", title: "Verdi", type: "number" }),
            defineField({ name: "suffix", title: "Suffiks", type: "string" }),
            defineField({ name: "label", title: "Etikett", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", tag: "categoryTag" },
    prepare({ title, tag }) {
      return { title, subtitle: tag };
    },
  },
});
