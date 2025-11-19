// HomeBooking.tsx
'use client';

import type { FormEvent } from "react";
import type { HomeBookingContentType } from "../../types/content/homeTypes";


interface HomeBookingProps {
  content: HomeBookingContentType;
  className?: string;
  onSubmit?: (payload: {
    nombre: string;
    telefono: string;
    servicio: string;
    fecha: string;
    hora: string;
    notas: string;
  }) => void;
}

const HomeBooking: React.FC<HomeBookingProps> = ({
  content,
  className = '',
  onSubmit,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement & {
      nombre: { value: string };
      telefono: { value: string };
      servicio: { value: string };
      fecha: { value: string };
      hora: { value: string };
      notas: { value: string };
    };

    const payload = {
      nombre: form.nombre.value,
      telefono: form.telefono.value,
      servicio: form.servicio.value,
      fecha: form.fecha.value,
      hora: form.hora.value,
      notas: form.notas.value,
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      alert(`Solicitud recibida:\n${JSON.stringify(payload, null, 2)}`);
    }

    form.reset();
  };

  return (
    <section id="reserva" className={`py-20 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold"> {content.heading} </h2>
          <p className="mt-2 max-w-2xl text-primary-200">
            {content.intro}{' '}
            <a className="underline" href={`tel:${content.phone}`}>
              {content.phone}
            </a>
            .
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-primary-700 bg-primary-900 p-6"
          >
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm text-primary-200"
              >
                {content.form.nameLabel}
              </label>
              <input
                id="nombre"
                name="nombre"
                required
                placeholder={content.form.namePlaceholder}
                className="input"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm text-primary-200"
                >
                  {content.form.phoneLabel}
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  required
                  placeholder={content.form.phonePlaceholder}
                  className="input"
                />
              </div>
              <div>
                <label
                  htmlFor="servicio"
                  className="block text-sm text-primary-200"
                >
                  {content.form.serviceLabel}
                </label>
                <select id="servicio" name="servicio" className="input">
                  {content.services.map((title) => (
                    <option key={title}>{title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fecha"
                  className="block text-sm text-primary-200"
                >
                  {content.form.dateLabel}
                </label>
                <input id="fecha" name="fecha" type="date" required className="input" />
              </div>
              <div>
                <label
                  htmlFor="hora"
                  className="block text-sm text-primary-200"
                >
                  {content.form.timeLabel}
                </label>
                <input id="hora" name="hora" type="time" required className="input" />
              </div>
            </div>

            <div>
              <label htmlFor="notas" className="block text-sm text-primary-200">
                {content.form.notesLabel}
              </label>
              <textarea
                id="notas"
                name="notas"
                placeholder={content.form.notesPlaceholder}
                className="input min-h-[120px]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary-100 px-4 py-3 font-semibold text-primary-900 transition hover:opacity-90"
            >
              {content.form.submitLabel}
            </button>

            <p className="text-xs text-primary-400">{content.bookingNote}</p>
          </form>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-primary-700">
              <img
                src={content.image.src}
                alt={content.image.alt || 'Interior de la barbería'}
                className="h-64 w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="rounded-3xl border border-primary-700 bg-primary-900 p-6">
              <h3 className="text-lg font-semibold">Horarios</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-primary-2 00 md:grid-cols-3">
                {content.hours.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
              <div className="mt-4 text-sm text-primary-200">
                <p>{content.address}</p>
                <a
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                  href={content.mapUrl}
                >
                  Ver en Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* input utility styles */}
      <style>{`
        .input {
          @apply mt-1 w-full rounded-xl border border-primary-700 bg-primary-800 px-3 py-2 text-primary-50 placeholder-primary-300 outline-none focus:border-primary-500;
        }
      `}</style>
    </section>
  );
};

export default HomeBooking;
