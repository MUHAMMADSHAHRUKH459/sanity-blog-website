"use client";

import React, { useState, useEffect } from "react";

// Define the type for a comment
type Comment = {
  id: number;
  name: string;
  comment: string;
};

const CommentSec: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]); // Comments list with type
  const [name, setName] = useState<string>(""); // Name input with type
  const [comment, setComment] = useState<string>(""); // Comment input with type

  // Load comments from localStorage when the component mounts
  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  // Save comments to localStorage whenever comments state changes
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // Handle adding a new comment
  const handleAddComment = () => {
    if (name.trim() && comment.trim()) {
      const newComment: Comment = { id: Date.now(), name, comment };
      setComments([...comments, newComment]);
      setName(""); // Clear name input
      setComment(""); // Clear comment input
    } else {
      alert("Please fill out both fields before adding a comment.");
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Comment Section</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <textarea
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows={4}
        ></textarea>
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Comment
        </button>
      </div>
      <div>
        {comments.length > 0 ? (
          comments.map((item) => (
            <div
              key={item.id}
              className="p-4 mb-4 border border-gray-300 rounded shadow-sm bg-white"
            >
              <p className="text-sm text-gray-500">By: {item.name}</p>
              <p className="mt-2">{item.comment}</p>
              <button
                onClick={() => handleDeleteComment(item.id)}
                className="text-red-500 text-sm mt-2 hover:underline"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSec;
