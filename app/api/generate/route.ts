import { NextRequest, NextResponse } from 'next/server';

interface VideoIdea {
  title: string;
  hook: string;
  description: string;
  targetAudience: string;
  keyElements: string[];
  thumbnailIdeas: string[];
  viralPotential: number;
  estimatedViews: string;
}

const viralStrategies = {
  hooks: [
    'Start with a shocking statement or statistic',
    'Ask a controversial question',
    'Show the end result first',
    'Create curiosity gap',
    'Use pattern interruption',
    'Make a bold claim',
  ],
  elements: [
    'Emotional storytelling',
    'Controversy/debate',
    'Unexpected twists',
    'High production value',
    'Relatable content',
    'Trending topics',
    'Challenge format',
    'Before/after transformation',
    'Expert secrets revealed',
    'Common mistakes exposed',
  ],
  thumbnailTactics: [
    'Shocked facial expression with bright colors',
    'Before/after split screen',
    'Large text with numbers or symbols',
    'High contrast colors (red, yellow, blue)',
    'Mysterious blurred elements',
    'Arrows pointing to key elements',
  ],
};

function generateViralIdeas(niche: string, contentType: string): VideoIdea[] {
  const ideas: VideoIdea[] = [];

  const templates = [
    {
      titleFormat: (n: string) => `I Tried ${n} for 30 Days - Shocking Results!`,
      hookFormat: (n: string) => `"I thought ${n} was a waste of time until THIS happened..."`,
      descFormat: (n: string) => `Follow a 30-day transformation journey in ${n} with unexpected results that will change your perspective. This documentary-style video tracks daily progress, challenges, and breakthrough moments.`,
      audience: 'People curious about starting or improving in this niche, ages 18-35',
      elements: ['Transformation story', 'Daily documentation', 'Raw authenticity', 'Surprising outcome'],
      thumbnails: [
        'Split screen: Day 1 vs Day 30 comparison',
        'Shocked expression with "30 DAYS" text overlay',
        'Before/after result with bright yellow border',
      ],
      viral: 9,
      views: '2-5M',
    },
    {
      titleFormat: (n: string) => `Why Everyone's Doing ${n} WRONG (Pro Secrets)`,
      hookFormat: (n: string) => `"If you're doing ${n} like this, STOP immediately..."`,
      descFormat: (n: string) => `Expose the common mistakes people make in ${n} and reveal professional-level techniques that most beginners don't know. This controversial take challenges conventional wisdom and provides actionable insights.`,
      audience: 'Beginners and intermediates looking to improve, ages 16-40',
      elements: ['Controversial take', 'Expert authority', 'Common mistakes', 'Pro tips'],
      thumbnails: [
        'Red X over common mistake, green check on correct method',
        'Frustrated person with "WRONG" in red text',
        'Secret revealed with mysterious background',
      ],
      viral: 8,
      views: '1-3M',
    },
    {
      titleFormat: (n: string) => `$0 to $10,000 ${n} Challenge (NO CLICKBAIT)`,
      hookFormat: (n: string) => `"Starting with absolutely nothing in ${n}, watch what happens in 7 days..."`,
      descFormat: (n: string) => `An authentic challenge documenting the journey from zero to significant results in ${n}. No fake setups, just real hustle, failures, and unexpected wins. Follow every step of the process with full transparency.`,
      audience: 'Aspiring creators and hustlers, ages 18-30',
      elements: ['Challenge format', 'Transparency', 'Relatable struggle', 'Inspiring success'],
      thumbnails: [
        'Progress bar from $0 to $10K with excited reaction',
        'Stack of cash with "7 DAYS" text',
        'Journey timeline with milestone markers',
      ],
      viral: 10,
      views: '5-10M',
    },
    {
      titleFormat: (n: string) => `${n} Experts HATE This Simple Trick`,
      hookFormat: (n: string) => `"This one ${n} hack changed everything, and it takes 5 minutes..."`,
      descFormat: (n: string) => `Discover a game-changing shortcut in ${n} that professionals don't want you to know about. This simple but powerful technique delivers results without the complexity or expense of traditional methods.`,
      audience: 'People seeking shortcuts and life hacks, ages 20-45',
      elements: ['Simplicity angle', 'Authority challenge', 'Quick results', 'Hack/trick format'],
      thumbnails: [
        'Mind-blown expression with "SIMPLE TRICK" text',
        'Before/after with time indicator',
        'Experts looking shocked in corner',
      ],
      viral: 7,
      views: '800K-2M',
    },
    {
      titleFormat: (n: string) => `I Bought the CHEAPEST vs MOST EXPENSIVE ${n}`,
      hookFormat: (n: string) => `"Can a $10 ${n} setup compete with a $10,000 one? The answer shocked me..."`,
      descFormat: (n: string) => `An entertaining comparison testing budget versus premium options in ${n}. Featuring detailed analysis, surprising discoveries, and honest recommendations about whether expensive gear is worth it.`,
      audience: 'Budget-conscious consumers and enthusiasts, ages 18-35',
      elements: ['Comparison format', 'Entertainment value', 'Practical insights', 'Surprise factor'],
      thumbnails: [
        'Split screen: cheap vs expensive side by side',
        'Shocked face between two products',
        'Price tags with "VS" in bold letters',
      ],
      viral: 9,
      views: '3-7M',
    },
  ];

  // Generate 3 ideas
  const selectedTemplates = templates.sort(() => Math.random() - 0.5).slice(0, 3);

  selectedTemplates.forEach(template => {
    ideas.push({
      title: template.titleFormat(niche),
      hook: template.hookFormat(niche),
      description: template.descFormat(niche),
      targetAudience: template.audience,
      keyElements: template.elements,
      thumbnailIdeas: template.thumbnails,
      viralPotential: template.viral,
      estimatedViews: template.views,
    });
  });

  return ideas;
}

export async function POST(request: NextRequest) {
  try {
    const { niche, contentType } = await request.json();

    if (!niche || typeof niche !== 'string') {
      return NextResponse.json(
        { error: 'Invalid niche provided' },
        { status: 400 }
      );
    }

    const ideas = generateViralIdeas(niche.trim(), contentType || '');

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error('Error generating ideas:', error);
    return NextResponse.json(
      { error: 'Failed to generate ideas' },
      { status: 500 }
    );
  }
}
