import { Tag } from "./Tag";

type Props = {
  tags: string[];
};

export function Tags({ tags }: Props) {
  return (
    <div className="inline-flex space-x-1">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}
