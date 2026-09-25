import {
  ArrowRight,
  FolderSimple,
  MagnifyingGlass,
  TerminalWindow,
} from '@phosphor-icons/react';
import { useEffect, useId, useRef, useState } from 'react';

const hosts = [
  { name: 'production', address: '192.0.2.10', group: 'Infrastructure' },
  { name: 'staging', address: '192.0.2.20', group: 'Infrastructure' },
  { name: 'dev-machine', address: '192.0.2.30', group: 'Development' },
];

type Entry = { id: number; command: string; output: string };

export default function WorkspaceDemo() {
  const searchId = useId();
  const commandId = useId();
  const outputRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [host, setHost] = useState(hosts[0]);
  const [command, setCommand] = useState('');
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 0,
      command: 'ls',
      output: 'apps/    backups/    config/    deploy.sh',
    },
  ]);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = entries.length ? output.scrollHeight : 0;
  }, [entries]);

  function run(value: string) {
    const input = value.trim();
    if (!input) return;
    if (input === 'clear') {
      setEntries([]);
      setCommand('');
      return;
    }
    const outputs: Record<string, string> = {
      help: 'Try: ls, pwd, whoami, hostname, clear.\nThis browser demo uses sample data. No remote connection is made.',
      ls: 'apps/    backups/    config/    deploy.sh',
      pwd: '/home/developer',
      whoami: 'developer',
      hostname: host.name,
    };
    setEntries((previous) => [
      ...previous.slice(-5),
      {
        id: (previous.at(-1)?.id ?? 0) + 1,
        command: input,
        output: Object.hasOwn(outputs, input)
          ? outputs[input]
          : `Command unavailable in this demo: ${input}\nType help to see supported commands.`,
      },
    ]);
    setCommand('');
  }

  return (
    <div className="workspace-demo">
      <div className="workspace-toolbar">
        <span className="workspace-title">
          <TerminalWindow size={18} /> Terra workspace
        </span>
        <span className="demo-label">Interactive demo</span>
      </div>
      <div className="workspace-body">
        <aside className="host-sidebar" aria-label="Sample hosts">
          <label className="sr-only" htmlFor={searchId}>
            Search sample hosts
          </label>
          <div className="host-search">
            <MagnifyingGlass size={16} />
            <input
              id={searchId}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a host"
            />
          </div>
          <p className="sidebar-label">
            <FolderSimple size={16} /> Personal vault
          </p>
          <div className="host-list">
            {hosts
              .filter((item) => item.name.includes(query.toLowerCase()))
              .map((item) => (
                <button
                  type="button"
                  key={item.name}
                  className={`host-item ${host.name === item.name ? 'selected' : ''}`}
                  aria-pressed={host.name === item.name}
                  onClick={() => {
                    setHost(item);
                    setEntries([
                      { id: 0, command: 'hostname', output: item.name },
                    ]);
                  }}
                >
                  <TerminalWindow size={18} />
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.address}</small>
                  </span>
                </button>
              ))}
            {!hosts.some((item) => item.name.includes(query.toLowerCase())) && (
              <p className="empty-hosts">No matching hosts. Try “staging”.</p>
            )}
          </div>
          <p className="sidebar-note">Sample hosts. Real possibilities.</p>
        </aside>
        <div className="terminal-pane">
          <div className="terminal-tab">
            <TerminalWindow size={16} />
            <span>{host.name}</span>
            <span className="terminal-tab-type">SSH</span>
          </div>
          <div
            ref={outputRef}
            className="terminal-output"
            role="log"
            aria-label="Demo terminal output"
            aria-live="polite"
            // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users must be able to scroll the output.
            tabIndex={0}
          >
            <p className="terminal-welcome">Welcome to your workspace.</p>
            <p className="terminal-hint">
              Select a host. Type a command. Make yourself at home.
            </p>
            {entries.map((entry) => (
              <div className="terminal-entry" key={entry.id}>
                <p>
                  <span className="terminal-prompt">
                    developer@{host.name} ~ $
                  </span>{' '}
                  {entry.command}
                </p>
                <pre>{entry.output}</pre>
              </div>
            ))}
            {entries.length === 0 && (
              <p className="terminal-hint">
                Terminal cleared. Try a command below.
              </p>
            )}
          </div>
          <form
            className="command-form"
            onSubmit={(event) => {
              event.preventDefault();
              run(command);
            }}
          >
            <span className="terminal-prompt" aria-hidden="true">
              $
            </span>
            <label htmlFor={commandId} className="sr-only">
              Demo terminal command
            </label>
            <input
              id={commandId}
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="Type help to get started"
              autoComplete="off"
              spellCheck={false}
              maxLength={120}
            />
            <button
              type="submit"
              aria-label="Run command"
              disabled={!command.trim()}
            >
              <ArrowRight size={19} />
            </button>
          </form>
        </div>
      </div>
      <div className="workspace-status">
        <span>Local browser demo. No credentials required.</span>
        <span>
          Try{' '}
          <button type="button" onClick={() => run('help')}>
            help
          </button>
        </span>
      </div>
    </div>
  );
}
