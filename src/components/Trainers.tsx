import { tinaField } from "tinacms/dist/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TrainersProps {
  title?: string;
  trainerList?: {
    name: string;
    role: string;
    image?: string;
    bio?: string;
  }[];
  [key: string]: any;
}

function TrainerCard({ trainer, index, props }: { trainer: any, index: number, props: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the card is visible
        rootMargin: "-50px 0px -50px 0px" // Add some margin to trigger near the center
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative group cursor-pointer" 
      data-tina-field={tinaField(props, `trainerList.${index}`)}
    >
      <div className="grid sm:grid-cols-12 gap-8 items-start">
        {/* Image Section */}
        <div className="sm:col-span-5 relative aspect-[4/5] sm:aspect-auto sm:h-[450px] overflow-hidden bg-muted">
          {trainer.image && (
            <img 
              src={trainer.image} 
              alt={trainer.name} 
              className={cn(
                "w-full h-full object-cover transition-all duration-1000",
                isVisible ? "grayscale-0 scale-100" : "grayscale scale-105",
                "lg:grayscale lg:scale-105 lg:group-hover:grayscale-0 lg:group-hover:scale-100"
              )}
              data-tina-field={tinaField(trainer, 'image')}
            />
          )}
          {/* Subtle corner accent */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
        </div>

        {/* Info Section */}
        <div className="sm:col-span-7 pt-4 sm:pt-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-primary font-bold tracking-[0.1em] uppercase text-sm" data-tina-field={tinaField(trainer, 'role')}>
              {trainer.role}
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-foreground uppercase" data-tina-field={tinaField(trainer, 'name')}>
            {trainer.name}
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium" data-tina-field={tinaField(trainer, 'bio')}>
            {trainer.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Trainers(props: TrainersProps) {
  const { title = "Våre trenere", trainerList } = props;
  
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-foreground uppercase leading-[0.9]" data-tina-field={tinaField(props, 'title')}>
              {title}
            </h2>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-primary mb-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-32">
          {trainerList?.map((trainer, i) => (
            <TrainerCard key={i} trainer={trainer} index={i} props={props} />
          ))}
        </div>
      </div>
    </section>
  );
}
