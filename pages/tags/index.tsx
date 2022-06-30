import { Tags } from "components/Tags";
import { allTags } from "lib/content";

export default function AllTags() {
  return (
    <div className="max-w-xl mx-auto py-8 text-center">
      <h1 className="text-3xl font-light mb-8">All tags used on the blog</h1>

      <Tags tags={allTags} />
    </div>
  );
}
