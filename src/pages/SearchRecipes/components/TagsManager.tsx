// src/components/TagsManager.tsx
import React, { useEffect, useState } from "react";
import tagService, { Tag } from "../../../services/tagService";

const TagsManager: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const fetchedTags = await tagService.getAllTags();
        setTags(fetchedTags);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tags:", err);
        setError("Failed to fetch tags");
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleAddTag = async () => {
    try {
      const newTag = await tagService.addTag({ name: newTagName });
      setTags([...tags, newTag]);
      setNewTagName("");
    } catch (err) {
      console.error("Error adding tag:", err);
      setError("Failed to add tag");
    }
  };

  const handleDeleteTag = async (id: number) => {
    try {
      await tagService.deleteTag(id);
      setTags(tags.filter((tag) => tag.id !== id));
    } catch (err) {
      console.error("Error deleting tag:", err);
      setError("Failed to delete tag");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Tags Manager</h2>
      <ul>
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="d-flex justify-content-between align-items-center mb-2"
          >
            <span>{tag.name}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteTag(tag.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          className="form-control"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="New tag name"
        />
        <button className="btn btn-primary mt-2" onClick={handleAddTag}>
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default TagsManager;
