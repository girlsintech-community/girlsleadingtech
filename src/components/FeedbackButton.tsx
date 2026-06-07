import * as React from "react";
import { Button } from "@/components/ui/button";

export default function FeedbackButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button asChild variant="secondary" size="default" className="shadow-soft">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeRE1g3tyUfgZ7UyqH3jGGIkQsJ2jfKlJaumpwGa_tPZeYcJQ/viewform"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Suggest a feature or resource"
        >
          Let us know
        </a>
      </Button>
    </div>
  );
}
