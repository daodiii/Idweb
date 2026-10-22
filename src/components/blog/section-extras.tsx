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
        <div className="bx-table">
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
              {table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tip && (
        <aside className={`bx-tip${tip.tone === "warn" ? " warn" : ""}`}>
          <h4>{tip.title}</h4>
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
