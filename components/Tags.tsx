import { Tag } from "./Tag";

type Props = {
  tags: string[];
}

export function Tags({ tags }: Props) {
  return (
    <div className="space-x-1">
      {tags.map(tag => <Tag tag={tag} />)}
    </div>
  );
}
