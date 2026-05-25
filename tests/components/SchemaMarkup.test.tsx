import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import SchemaMarkup from "@/components/ui/SchemaMarkup";

describe("SchemaMarkup", () => {
  it("renders a <script> tag with type='application/ld+json'", () => {
    const schema = { "@context": "https://schema.org", "@type": "Hotel" };
    const { container } = render(<SchemaMarkup schema={schema} />);

    const script = container.querySelector("script");
    expect(script).not.toBeNull();
    expect(script?.getAttribute("type")).toBe("application/ld+json");
  });

  it("renders valid JSON content that matches the passed schema prop", () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      name: "SKYCOMFY HOTEL KITALE",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kitale",
        addressCountry: "KE",
      },
    };
    const { container } = render(<SchemaMarkup schema={schema} />);

    const script = container.querySelector("script");
    expect(script).not.toBeNull();

    const content = script?.innerHTML ?? "";
    expect(() => JSON.parse(content)).not.toThrow();

    const parsed = JSON.parse(content);
    expect(parsed).toEqual(schema);
  });

  it("Hotel schema contains @type: 'Hotel'", () => {
    const hotelSchema = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      name: "SKYCOMFY HOTEL KITALE",
    };
    const { container } = render(<SchemaMarkup schema={hotelSchema} />);

    const script = container.querySelector("script");
    const parsed = JSON.parse(script?.innerHTML ?? "{}");
    expect(parsed["@type"]).toBe("Hotel");
  });

  it("LocalBusiness schema contains @type: 'LocalBusiness'", () => {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "SKYCOMFY HOTEL KITALE",
      telephone: "+254747118328",
    };
    const { container } = render(<SchemaMarkup schema={localBusinessSchema} />);

    const script = container.querySelector("script");
    const parsed = JSON.parse(script?.innerHTML ?? "{}");
    expect(parsed["@type"]).toBe("LocalBusiness");
  });

  it("renders nothing extra — only a single script tag", () => {
    const schema = { "@context": "https://schema.org", "@type": "Hotel" };
    const { container } = render(<SchemaMarkup schema={schema} />);

    expect(container.children).toHaveLength(1);
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe("script");
  });
});
