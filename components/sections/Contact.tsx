"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(7, "Teléfono inválido"),
  asunto: z.string().min(3, "El asunto es requerido"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Integración con EmailJS - configurar variables de entorno
      // const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      // const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      // await emailjs.send(serviceId, templateId, data);

      // Simulación temporal - reemplazar con integración real
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form data:", data);

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-[#f5f5f5]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-6 font-heading">
              Contacto
            </h2>
            <p className="text-gray-600 mb-8">
              Estamos aquí para responder tus preguntas. Escríbenos o visítanos en Ayapel.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[#1a4792] mb-2">Dirección</h3>
                <p className="text-gray-600">
                  Calle 11 No 6-87, Ayapel - Córdoba, Colombia
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1a4792] mb-2">Email</h3>
                <a
                  href="mailto:corembrion@hotmail.com"
                  className="text-gray-600 hover:text-[#1a4792] transition-colors"
                >
                  corembrion@hotmail.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-[#1a4792] mb-2">Teléfono</h3>
                <a
                  href="tel:+573002824880"
                  className="text-gray-600 hover:text-[#1a4792] transition-colors"
                >
                  +57 300 282 4880
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-xl overflow-hidden aspect-video bg-gray-200">
              <iframe
                src="https://maps.google.com/maps?q=Ayapel,+C%C3%B3rdoba,+Colombia&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Corembrion Ayapel"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  id="nombre"
                  {...register("nombre")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792]"
                  placeholder="Tu nombre"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792]"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  id="telefono"
                  {...register("telefono")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792]"
                  placeholder="+57 300 000 0000"
                />
                {errors.telefono && (
                  <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto *
                </label>
                <input
                  id="asunto"
                  {...register("asunto")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792]"
                  placeholder="Asunto del mensaje"
                />
                {errors.asunto && (
                  <p className="mt-1 text-sm text-red-600">{errors.asunto.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  {...register("mensaje")}
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792]"
                  placeholder="Escribe tu mensaje..."
                />
                {errors.mensaje && (
                  <p className="mt-1 text-sm text-red-600">{errors.mensaje.message}</p>
                )}
              </div>

              {submitStatus === "success" && (
                <p className="text-green-600 font-medium">¡Mensaje enviado correctamente!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 font-medium">Error al enviar. Intenta de nuevo.</p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
