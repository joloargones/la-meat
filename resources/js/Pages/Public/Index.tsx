import Navbar from '@/Components/Public/Navbar';
import ProductCard from '@/Components/Public/ProductCard';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Separator } from '@/Components/ui/separator';
import { landingProducts } from '@/data/landing-products';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Head } from '@inertiajs/react';
import { ArrowRightIcon } from 'lucide-react';

export default function Index() {
    return (
        <MarketingLayout>
            <Head title="LA Meat — Premium cuts delivered" />
            <div id="home" className="scroll-mt-16">
                <Navbar />
                <main>
                    <section className="border-b border-border/60 bg-muted/30">
                        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
                            <div className="mx-auto max-w-2xl text-center">
                                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                                    Farm to table
                                </p>
                                <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                                    Quality meat, thoughtfully sourced
                                </h1>
                                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                                    Hand-cut selections from trusted producers.
                                    Shop the counter online—cart and checkout
                                    will connect to your store API when you are
                                    ready.
                                </p>
                                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                    <Button size="lg" asChild>
                                        <a href="#products">
                                            Browse products
                                            <ArrowRightIcon className="size-4" />
                                        </a>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <a href="#about">Our story</a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        id="products"
                        className="scroll-mt-20 border-b border-border/60 py-16 sm:py-20"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                                        Featured products
                                    </h2>
                                    <p className="mt-2 max-w-xl text-muted-foreground">
                                        Placeholder catalog for layout—swap this
                                        grid for live data from Laravel when your
                                        API is wired up.
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-10" />
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {landingProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    <section
                        id="about"
                        className="scroll-mt-20 border-b border-border/60 bg-muted/20 py-16 sm:py-20"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
                                <div>
                                    <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                                        About LA Meat
                                    </h2>
                                    <p className="mt-4 text-muted-foreground">
                                        We focus on transparent sourcing,
                                        skilled butchery, and consistent quality
                                        so every cut is something you are proud
                                        to serve. This section is ready for your
                                        brand story, team photos, and values.
                                    </p>
                                    <p className="mt-4 text-muted-foreground">
                                        The layout uses shadcn/ui primitives and
                                        Tailwind spacing so you can extend it
                                        without fighting the design system.
                                    </p>
                                </div>
                                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted ring-1 ring-border">
                                    <img
                                        src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80"
                                        alt="Butcher preparing meat"
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="contact" className="scroll-mt-20 py-16 sm:py-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-xl text-center">
                                <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                                    Contact
                                </h2>
                                <p className="mt-2 text-muted-foreground">
                                    Questions about orders or wholesale? Leave
                                    your email—we will hook this up to your
                                    backend later.
                                </p>
                                <form
                                    className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        className="h-10 sm:flex-1"
                                        autoComplete="email"
                                    />
                                    <Button type="submit" className="sm:w-auto">
                                        Join list
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="mt-auto border-t border-border/60 py-10">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-muted-foreground sm:flex-row sm:text-left sm:px-6 lg:px-8">
                        <p>© {new Date().getFullYear()} LA Meat. All rights reserved.</p>
                        <p className="sm:max-w-md">
                            Built with Laravel, Inertia, React, Vite, and
                            shadcn/ui.
                        </p>
                    </div>
                </footer>
            </div>
        </MarketingLayout>
    );
}
