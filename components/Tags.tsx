import { Tag } from "./Tag";

export function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="inline-flex space-x-1">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
