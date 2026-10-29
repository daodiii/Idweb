import type { BlogSection } from "@/types";
import { RichText } from "./rich-text";
import { Checklist, CodeBlock, PostWidget, Tabs } from "./post-widgets";

/** Optional blocks of an article section: figure, table, tip, code, tabs and checklist, in that order. */
export function SectionExtras({ section }: { section: BlogSection }) {
  const { widget, table, tip, code, tabs, checklist } = section;
  return (
    <>
      {widget && <PostWidget name={widget} />}
      {table && (
        <div className="bx-table" role="region" aria-label="Sammenligning" tabIndex={0}>
          <table>
            <thead>
              <tr>
                {table.head.map((cell) => (
                  <th key={cell} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, r) => (
                <tr key={`${row[0]}-${r}`}>
                  {row.map((cell, i) => (i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tip && (
        <aside className={`bx-tip${tip.tone === "warn" ? " warn" : ""}`}>
          <p className="bx-tip-title">{tip.title}</p>
          <p>
            <RichText text={tip.text} />
          </p>
        </aside>
      )}
      {code && <CodeBlock caption={code.caption} code={code.code} />}
      {tabs && <Tabs tabs={tabs} />}
      {checklist && <Checklist title={checklist.title} items={checklist.items} />}
    </>
  );
}
