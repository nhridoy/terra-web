import { useState } from 'react';
import { Sparkles, TerminalSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function LandingDemo() {
	const [count, setCount] = useState(0);

	return (
		<Card className="w-full text-left">
			<CardHeader>
				<div className="flex flex-wrap items-center gap-2">
					<Badge data-icon="inline-start">
						<Sparkles />
						React island
					</Badge>
					<Badge variant="secondary">Hydrated with client:visible</Badge>
				</div>
				<CardTitle className="text-lg">shadcn/ui running inside Astro</CardTitle>
				<CardDescription>
					This card is a React component — server-rendered, then hydrated in the
					browser. The counter below updates client-side only.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-wrap items-center gap-3">
					<Button onClick={() => setCount((c) => c + 1)}>Clicked {count} times</Button>
					<Button variant="outline" onClick={() => setCount(0)}>
						Reset
					</Button>
				</div>
				<Separator />
				<p className="flex items-start gap-2 text-sm text-muted-foreground">
					<TerminalSquare className="mt-0.5" />
					<span>
						Tailwind v4 utilities and design tokens are configured in
						src/styles/global.css — no tailwind.config file needed.
					</span>
				</p>
			</CardContent>
		</Card>
	);
}