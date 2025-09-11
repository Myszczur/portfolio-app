import React from "react";

const ProjectCard = ({ title, description, image, tags }) => {
  return (
    <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-16">
      <div className="relative w-full max-w-5xl h-[70vh] rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-md border border-gray-700 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-1/2 md:h-full">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
          <p className="text-gray-300 leading-relaxed mb-6">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-green-900/50 text-green-300 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
