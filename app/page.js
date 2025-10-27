'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const PERIOD_MONTHS = 6;

const formatNumber = (value) => value.toLocaleString('pt-BR');

const calculateTimeBreakdown = (targetDate) => {
  const now = new Date();
  if (targetDate <= now) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  let years = targetDate.getFullYear() - now.getFullYear();
  let months = targetDate.getMonth() - now.getMonth();

  if (targetDate.getDate() < now.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const anchor = new Date(now);
  anchor.setFullYear(anchor.getFullYear() + years);
  anchor.setMonth(anchor.getMonth() + months);

  let diffMs = Math.max(targetDate - anchor, 0);
  const totalSeconds = Math.floor(diffMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds
  };
};

const buildStickFigure = (id) => (
  <svg
    className="h-28 w-28 text-pink-300 drop-shadow-lg"
    viewBox="0 0 120 120"
    role="img"
    aria-labelledby={`${id}-title`}
  >
    <title id={`${id}-title`}>Atenção brincando com o tempo</title>
    <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="30" r="20" fill="rgba(255, 192, 203, 0.35)" />
      <path d="M60 50 L60 85" />
      <path d="M60 60 Q45 70 35 60" />
      <path d="M60 60 Q75 70 85 60" />
      <path d="M60 85 Q50 105 40 110" />
      <path d="M60 85 Q70 105 80 110" />
      <path d="M82 52 L108 28" strokeWidth="8" />
      <path d="M94 36 L110 42" strokeWidth="5" />
      <circle cx="110" cy="42" r="4" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

export default function HomePage() {
  const startRef = useRef();
  if (!startRef.current) {
    startRef.current = new Date();
  }

  const graduationDate = useMemo(() => {
    const target = new Date(startRef.current);
    target.setFullYear(target.getFullYear() + 3);
    return target;
  }, []);

  const totals = useMemo(() => {
    const totalMs = graduationDate - startRef.current;
    const totalSeconds = Math.round(totalMs / 1000);
    const totalMinutes = Math.round(totalSeconds / 60);
    const totalHours = Math.round(totalMinutes / 60);
    const totalDays = Math.round(totalHours / 24);
    const totalMonths = (graduationDate.getFullYear() - startRef.current.getFullYear()) * 12 +
      graduationDate.getMonth() - startRef.current.getMonth();
    const totalPeriods = Math.round(totalMonths / PERIOD_MONTHS);

    return {
      totalSeconds,
      totalMinutes,
      totalHours,
      totalDays,
      totalPeriods
    };
  }, [graduationDate]);

  const [remaining, setRemaining] = useState(() => calculateTimeBreakdown(graduationDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(calculateTimeBreakdown(graduationDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [graduationDate]);

  const cards = [
    {
      title: 'Horas em 3 anos',
      value: `${formatNumber(totals.totalHours)} h`,
      subtitle: 'Cada hora conta para a conquista da Alice.'
    },
    {
      title: 'Minutos em 3 anos',
      value: `${formatNumber(totals.totalMinutes)} min`,
      subtitle: 'Minutinhos somando carinho e dedicação.'
    },
    {
      title: 'Segundos em 3 anos',
      value: `${formatNumber(totals.totalSeconds)} s`,
      subtitle: 'Porque cada segundo acelera o coração.'
    },
    {
      title: 'Períodos na faculdade de 3 anos',
      value: `${formatNumber(totals.totalPeriods)} períodos`,
      subtitle: 'Seis capítulos para celebrar com Atenção.'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="hearts" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ '--i': index + 1 }} />
        ))}
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-12 sm:px-10">
        <header className="flex flex-col items-start gap-4 text-left">
          <p className="text-sm uppercase tracking-[0.4em] text-pink-400">Contagem amorosa</p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Tempo para Alice se formar
          </h1>
          <p className="max-w-xl text-base text-pink-200 sm:text-lg">
            Uma jornada romântica e mobile-first que acompanha cada instante até a formatura da Alice, com o
            companheiro Atenção cuidando para que o tempo voe rapidinho.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="rounded-3xl border border-pink-600/40 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-6 shadow-[0_0_35px_rgba(255,20,147,0.25)]">
            <h2 className="text-lg font-medium text-pink-300">3 anos</h2>
            <p className="mt-2 text-4xl font-semibold text-white">
              {formatNumber(totals.totalDays)} dias
            </p>
            <p className="mt-3 text-sm text-pink-200">
              Equivalem a todo o caminho doce até o grande dia da formatura.
            </p>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-neutral-900/80 p-4">
              <div className="flex flex-col text-sm text-pink-200">
                <span className="font-semibold text-pink-400">Contagem atual</span>
                <span>{remaining.years} anos • {remaining.months} meses • {remaining.days} dias</span>
                <span>{remaining.hours} horas • {remaining.minutes} minutos • {remaining.seconds} segundos</span>
              </div>
              {buildStickFigure('atencao-main')}
            </div>
          </article>

          {cards.map((card, index) => (
            <article
              key={card.title}
              className="rounded-3xl border border-pink-600/40 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-6 shadow-[0_0_25px_rgba(255,20,147,0.18)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-pink-300">{card.title}</h3>
                  <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
                  <p className="mt-3 text-sm text-pink-200">{card.subtitle}</p>
                </div>
                {buildStickFigure(`atencao-${index}`)}
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-auto flex flex-col gap-2 pb-6 text-center text-xs text-pink-300/80">
          <p>Projeto pensado para um deploy rápido na Vercel com Next.js.</p>
          <p>
            Ajuste as imagens do Atenção em <code>public/</code> caso deseje substituir os vetores por fotos
            fornecidas localmente.
          </p>
        </footer>
      </main>
    </div>
  );
}
