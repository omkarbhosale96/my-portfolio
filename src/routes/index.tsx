import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omkar Bhosale — Senior Java Backend Engineer" },
      { name: "description", content: "Senior Software Engineer with 5+ years building scalable systems with Java, Spring Boot, Microservices, Kafka & Elasticsearch." },
      { property: "og:title", content: "Omkar Bhosale — Senior Java Backend Engineer" },
      { property: "og:description", content: "Building scalable systems and high-performance APIs." },
    ],
  }),
  component: Portfolio,
});
