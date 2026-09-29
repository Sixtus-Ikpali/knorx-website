'use client';

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent } from 'react';
import styles from './WorkflowVisualization.module.css';

const stages = ['Discover', 'Define', 'Design', 'Build', 'Deploy', 'Evolve'] as const;

function StageGraphic({ index }: { index: number }) {
  if (index === 0) return <svg viewBox="0 0 120 100" aria-hidden="true">
    <path className={styles.microGuide} d="M18 22 79 50M16 70 79 50M47 13 79 50" />
    <circle className={styles.discoverDotA} cx="18" cy="22" r="3" />
    <circle className={styles.discoverDotB} cx="16" cy="70" r="3" />
    <circle className={styles.discoverDotC} cx="47" cy="13" r="3" />
    <circle className={styles.microTarget} cx="79" cy="50" r="7" />
  </svg>;
  if (index === 1) return <svg viewBox="0 0 120 100" aria-hidden="true">
    <rect className={styles.microSquare} x="18" y="25" width="7" height="7" />
    <rect className={styles.microSquare} x="18" y="47" width="7" height="7" />
    <rect className={styles.microSquare} x="18" y="69" width="7" height="7" />
    <path className={styles.defineLine} d="M37 29H94M37 51H82M37 73H99" />
  </svg>;
  if (index === 2) return <svg viewBox="0 0 120 100" aria-hidden="true">
    <path className={styles.designPaths} d="M30 26 83 34 91 70 42 75 30 26M83 34 42 75" />
    <circle className={styles.microTarget} cx="30" cy="26" r="4" /><circle className={styles.microTarget} cx="83" cy="34" r="4" />
    <circle className={styles.microTarget} cx="91" cy="70" r="4" /><circle className={styles.microTarget} cx="42" cy="75" r="4" />
  </svg>;
  if (index === 3) return <svg viewBox="0 0 120 100" aria-hidden="true">
    <rect className={`${styles.buildBlock} ${styles.buildA}`} x="36" y="25" width="23" height="21" />
    <rect className={`${styles.buildBlock} ${styles.buildB}`} x="62" y="25" width="23" height="21" />
    <rect className={`${styles.buildBlock} ${styles.buildC}`} x="36" y="49" width="23" height="21" />
    <rect className={`${styles.buildBlock} ${styles.buildD}`} x="62" y="49" width="23" height="21" />
  </svg>;
  if (index === 4) return <svg viewBox="0 0 120 100" aria-hidden="true">
    <path className={styles.microGuide} d="M70 14V84" />
    <rect className={styles.deployModule} x="28" y="40" width="27" height="20" />
    <circle className={styles.deployIndicator} cx="89" cy="50" r="5" />
    <path className={styles.microGuide} d="M79 68H99" />
  </svg>;
  return <svg viewBox="0 0 120 100" aria-hidden="true">
    <circle className={styles.microGuide} cx="59" cy="50" r="12" />
    <path className={styles.evolveArc} d="M70 21A33 33 0 1 1 30 29" />
    <path className={styles.evolveReturn} d="M30 29 27 17 39 20" />
    <circle className={styles.microTarget} cx="59" cy="50" r="3" />
  </svg>;
}

function MicroScenes({ selected }: { selected: number | null }) {
  return <div className={styles.microScenes} aria-hidden="true">
    {stages.map((stage, index) => <div
      key={stage}
      className={`${styles.microScene} ${styles[`stage${index}`]}`}
      data-selected={selected === index}
      style={{ '--phase-delay': `${index * 2}s` } as CSSProperties}
    ><StageGraphic index={index} /></div>)}
  </div>;
}

export default function WorkflowVisualization() {
  const rootRef = useRef<HTMLDivElement>(null);
  const intersectionRef = useRef(true);
  const [inView, setInView] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const selected = focused ?? hovered ?? pinned;

  useEffect(() => {
    if (pinned === null) return;
    const timeout = window.setTimeout(() => setPinned(null), 6000);
    return () => window.clearTimeout(timeout);
  }, [pinned]);

  useEffect(() => {
    function updateVisibility() { setInView(intersectionRef.current && !document.hidden); }
    document.addEventListener('visibilitychange', updateVisibility);
    if (typeof IntersectionObserver === 'undefined') return () => document.removeEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      intersectionRef.current = entry.isIntersecting;
      updateVisibility();
    }, { threshold: 0.1 });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);

  function stageEvents(index: number) {
    return {
      onPointerEnter: (event: PointerEvent<HTMLButtonElement>) => { if (event.pointerType === 'mouse') setHovered(index); },
      onPointerLeave: () => setHovered((current) => current === index ? null : current),
      onFocus: () => setFocused(index),
      onBlur: () => setFocused((current) => current === index ? null : current),
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        setPinned(index);
        if (event.detail > 0) setFocused(null);
      },
    };
  }

  return <div
    ref={rootRef}
    className={styles.workflow}
    role="group"
    aria-label="Continuous KNORX delivery process: Discover, Define, Design, Build, Deploy, Evolve, then Discover again"
    data-interacting={selected !== null}
    data-visible={inView}
  >
    <div className={styles.desktop}>
      <svg className={styles.topology} viewBox="0 0 500 500" aria-hidden="true">
        <defs><marker id="knorx-workflow-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 6 3 0 6" /></marker></defs>
        <circle className={styles.outerRing} cx="250" cy="250" r="171" />
        <circle className={styles.innerRing} cx="250" cy="250" r="115" />
        <path className={styles.segment} d="M280 82 A171 171 0 0 1 381 140" markerEnd="url(#knorx-workflow-arrow)" />
        <path className={styles.segment} d="M411 192 A171 171 0 0 1 411 308" markerEnd="url(#knorx-workflow-arrow)" />
        <path className={styles.segment} d="M381 360 A171 171 0 0 1 280 418" markerEnd="url(#knorx-workflow-arrow)" />
        <path className={styles.segment} d="M220 418 A171 171 0 0 1 119 360" markerEnd="url(#knorx-workflow-arrow)" />
        <path className={styles.segment} d="M89 308 A171 171 0 0 1 89 192" markerEnd="url(#knorx-workflow-arrow)" />
        <path className={styles.segment} d="M119 140 A171 171 0 0 1 220 82" markerEnd="url(#knorx-workflow-arrow)" />
        <circle className={styles.signal} cx="250" cy="250" r="171" transform="rotate(-90 250 250)" />
      </svg>
      <div className={styles.desktopCore}><MicroScenes selected={selected} /></div>
      {stages.map((stage, index) => <button
        key={stage}
        type="button"
        className={`${styles.node} ${styles[`stage${index}`]}`}
        style={{ '--phase-delay': `${index * 2}s` } as CSSProperties}
        data-selected={selected === index}
        aria-label={`${stage}, stage ${index + 1} of 6`}
        {...stageEvents(index)}
      ><span className={styles.nodeIndex}>0{index + 1}</span><span className={styles.nodeName}>{stage}</span></button>)}
    </div>

    <div className={styles.mobile}>
      <div className={styles.mobileCore}>
        <div className={styles.mobileCoreRing} aria-hidden="true"><MicroScenes selected={selected} /></div>
        {stages.map((stage, index) => <button
          key={stage}
          type="button"
          className={`${styles.indicator} ${styles[`stage${index}`]}`}
          style={{ '--phase-delay': `${index * 2}s` } as CSSProperties}
          data-selected={selected === index}
          aria-label={`Show ${stage}, stage ${index + 1} of 6`}
          aria-pressed={selected === index}
          {...stageEvents(index)}
        ><span aria-hidden="true">0{index + 1}</span></button>)}
      </div>
      <div className={styles.mobileReadout} aria-hidden="true">{stages.map((stage, index) => <div
        key={stage}
        className={`${styles.readoutItem} ${styles[`stage${index}`]}`}
        data-selected={selected === index}
        style={{ '--phase-delay': `${index * 2}s` } as CSSProperties}
      ><strong>{stage}</strong><span>0{index + 1} / 06</span></div>)}</div>
      <span className="visually-hidden" aria-live="polite">{selected !== null ? `Showing ${stages[selected]}, stage ${selected + 1} of 6.` : ''}</span>
      <ol className={styles.reducedLegend}>{stages.map((stage) => <li key={stage}>{stage}</li>)}</ol>
    </div>
  </div>;
}
