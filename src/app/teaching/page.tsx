import Container from "@/components/Container";
import { teaching } from "@/content/site";

export default function TeachingPage() {
  return (
    <Container className="py-16">
      <h1 className="font-serif text-3xl text-foreground">Teaching</h1>

      <section className="mt-8">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Philosophy
        </h2>
        <p className="mt-3 leading-relaxed text-foreground">
          {teaching.philosophy}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Courses
        </h2>
        <div className="mt-4 space-y-6">
          {teaching.courses.map((course, i) => (
            <div key={i} className="border-b border-border pb-6">
              <h3 className="font-serif text-base text-foreground">
                {course.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {course.institution} · {course.year}
              </p>
              <p className="mt-2 text-sm text-muted">{course.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted">
          Open teaching materials
        </h2>
        <p className="mt-3 text-sm text-muted">
          [PLACEHOLDER — links to open lecture slides and student resources.]
        </p>
      </section>
    </Container>
  );
}
