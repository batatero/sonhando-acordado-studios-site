import { useEffect, useState } from "react";

import {
  fallbackProjectsContent,
  getProjectsContent,
  type ProjectsContent,
} from "@/services/projects";

export function useProjectsContent() {
  const [content, setContent] = useState<ProjectsContent>(
    fallbackProjectsContent,
  );

  useEffect(() => {
    let isCurrent = true;

    void getProjectsContent().then((nextContent) => {
      if (isCurrent) setContent(nextContent);
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  return content;
}
