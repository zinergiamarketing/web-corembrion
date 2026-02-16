"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";

const stats = [
  { value: 20, suffix: "+", label: "años de experiencia", duration: 2 },
  { value: 12, suffix: "+", label: "proyectos ejecutados", duration: 2 },
  { value: 80, suffix: "", label: "mil millones en contratos", prefix: "+$", duration: 2.5 },
  { value: 4, suffix: "", label: "departamentos impactados", duration: 1.5 },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  inView = false,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  inView?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const startTime = Date.now();

    const updateCount = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * end);
      setCount(current);
      if (progress < 1) requestAnimationFrame(updateCount);
    };

    requestAnimationFrame(updateCount);
  }, [value, duration, inView]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-[#1a4792] text-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-heading">
            Experiencia e Impacto
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Córdoba, Sucre, Bolívar y Magdalena
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix}
                  duration={stat.duration}
                  inView={isInView}
                />
              </div>
              <p className="text-white/90">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-white/20 pt-12"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Desarrollo Institucional</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-lg p-6">
              <p className="font-semibold text-[#9cc0dd]">2004-2008</p>
              <p className="mt-2">Siembra y repoblamiento Ciénaga de Ayapel + capacitaciones</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <p className="font-semibold text-[#9cc0dd]">2014-2019</p>
              <p className="mt-2">Expansión proyectos piscícolas</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <p className="font-semibold text-[#9cc0dd]">2020-2024</p>
              <p className="mt-2">Mega proyectos agrícolas y acuicultura regional</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
