import React from 'react';

export type Slide = {
    id: number;
    type: 'image' | 'video';
    source: string;
    title: string;
    text?: string;
}

type LinkItem = {
    title: string;
    url: string;
}

export type ProjectMappingItem = {
    title: string;
    description: React.ReactNode;
    slides: Slide[];
    links: LinkItem[];
    element: React.ReactElement;
}