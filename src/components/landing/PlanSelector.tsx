import { ArrowUpRight, Check } from '@phosphor-icons/react';
import { useState } from 'react';

const plans = [
  {
    id: 'self-hosted',
    label: 'Self-hosted',
    title: 'Your infrastructure. Your call.',
    price: 'Open source',
    unit: 'Run Terra on your own infrastructure.',
    description:
      'For developers and teams who want to own their setup, inspect the code, and choose where their data lives.',
    features: [
      'SSH and SFTP workspace',
      'Your own sync server',
      'Client-side encrypted credentials',
    ],
    href: 'https://github.com/nhridoy/terra#quick-start',
    action: 'Self-host Terra',
  },
  {
    id: 'cloud-free',
    label: 'Cloud Free',
    title: 'A lighter way to get started.',
    price: 'Free',
    unit: 'A starting point for individual developers.',
    description:
      'The same focused workspace, with a managed cloud option so you can spend more time on your own infrastructure.',
    features: [
      'SSH and SFTP workspace',
      'Managed cloud option',
      'A free tier for individuals',
    ],
    href: 'https://github.com/nhridoy/terra/discussions',
    action: 'Cloud updates',
  },
  {
    id: 'teams',
    label: 'Cloud Teams',
    title: 'Make room for your team.',
    price: 'For teams',
    unit: 'Paid cloud plans for shared work.',
    description:
      'Bring your team into one workspace with shared vaults and a managed deployment. Follow the project for plan details.',
    features: [
      'Shared team vaults',
      'Managed cloud option',
      'Team-focused plans',
    ],
    href: 'https://github.com/nhridoy/terra/discussions',
    action: 'Cloud updates',
  },
];

export default function PlanSelector() {
  const [selected, setSelected] = useState(0);
  const plan = plans[selected];
  return (
    <div className="plan-selector">
      <div className="plan-tabs" role="tablist" aria-label="Terra plans">
        {plans.map((item, index) => (
          <button
            key={item.id}
            id={`tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={selected === index}
            aria-controls="plan-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === 'ArrowRight') next = (index + 1) % plans.length;
              else if (event.key === 'ArrowLeft')
                next = (index + plans.length - 1) % plans.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = plans.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              document.getElementById(`tab-${plans[next].id}`)?.focus();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id="plan-panel"
        className="plan-panel"
        role="tabpanel"
        aria-labelledby={`tab-${plan.id}`}
      >
        <div className="plan-story">
          <h3>{plan.title}</h3>
          <p>{plan.description}</p>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>
                <Check size={18} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="plan-action">
          <strong>{plan.price}</strong>
          <p>{plan.unit}</p>
          <a className="button button-primary" href={plan.href}>
            {plan.action}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
