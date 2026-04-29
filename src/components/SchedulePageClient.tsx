"use client";

import { useTina } from "tinacms/dist/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { tinaField } from "tinacms/dist/react";

export function SchedulePageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const schedule = props.query ? data.schedule : props.data.schedule;

  return (
    <div className="bg-background min-h-screen">
      <div className="pt-32 bg-muted/30 border-b border-border/40 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase leading-[0.85]">Treningstider</h1>
        </div>
      </div>
      
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Card className="shadow-sm border-border/50">
            <CardHeader>
              <CardTitle>Timeplan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground mb-8">
                Her finner du en oversikt for treningstidene våre. Endringer kan forekomme i ferier eller på helligdager. Vi informerer alltid om dette på vår Facebook-side for våre medlemmer.
              </div>
              
              <div className="space-y-8">
                {schedule.days?.map((day: any, i: number) => (
                  <div key={i} className="border-b border-border pb-6 last:border-0" data-tina-field={tinaField(day)}>
                    <h3 className="text-xl font-bold mb-4 text-primary">{day.day}</h3>
                    <div className="grid gap-3">
                      {day.slots?.map((slot: any, j: number) => (
                        <div key={j} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/50 rounded-lg" data-tina-field={tinaField(slot)}>
                          <div className="font-semibold text-lg">{slot.time}</div>
                          <div className="flex flex-col sm:items-end">
                            <div className="font-medium">{slot.activity}</div>
                            <div className="text-sm text-muted-foreground">{slot.group}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
