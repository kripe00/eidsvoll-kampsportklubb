import { tinaField } from "tinacms/dist/react";
import { Shield, Users, Zap, HeartHandshake, ShieldCheck, Info } from "lucide-react";

const iconMap: Record<string, any> = {
  Users,
  HeartHandshake,
  ShieldCheck,
  Shield,
  Zap,
  Info,
};

interface ValuesProps {
  title?: string;
  description?: string;
  variant?: "asymmetric" | "navy";
  items?: {
    title: string;
    text: string;
    icon: string;
  }[];
  [key: string]: any;
}

export function Values(props: ValuesProps) {
  const { 
    title = "Trygghet, respekt og fellesskap", 
    description = "For oss er kampsport et verktøy for å bygge gode holdninger og sterke mennesker.",
    items = [],
    image
  } = props;

  return (
    <section className="py-32 bg-background overflow-hidden" data-tina-field={tinaField(props)}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Column A: Editorial Vision */}
          <div className="lg:w-2/5 space-y-12">
            <div className="max-w-md">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-10 text-foreground leading-[1] uppercase" data-tina-field={tinaField(props, 'title')}>
                {title}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-light italic" data-tina-field={tinaField(props, 'description')}>
                {description}
              </p>
            </div>

            {image && (
              <div className="relative group overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.02]" data-tina-field={tinaField(props, 'image')}>
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
              </div>
            )}
          </div>

          {/* Column B: Integrated Values Grid */}
          <div className="lg:w-3/5">
            <div className="grid gap-x-12 gap-y-20 sm:grid-cols-2">
              {items.map((item, i) => {
                const Icon = iconMap[item.icon] || ShieldCheck;
                return (
                  <div key={i} className="flex flex-col" data-tina-field={tinaField(item)}>
                    <div className="flex items-baseline gap-4 mb-6">
                      {/* Subthe thin royal blue line marker */}
                      <div className="w-[1px] h-10 bg-primary/40 shrink-0 self-start" />
                      <h3 className="text-2xl font-bold tracking-tight text-foreground uppercase pt-1" data-tina-field={tinaField(item, 'title')}>
                        {item.title}
                      </h3>
                    </div>
                    <div className="pl-4">
                      <p className="text-lg text-muted-foreground leading-relaxed font-medium" data-tina-field={tinaField(item, 'text')}>
                        {item.text}
                      </p>
                      <Icon className="mt-6 w-6 h-6 text-primary stroke-[1.25px]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
