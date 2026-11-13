export const REALISATIONS_ITEMS = [
    {
        id: 'realisation-01',
        src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=900',
        alt: 'Structure de maison en cours sur chantier',
        caption: 'Je vérifie armatures et coffrage avant le coulage.',
    },
    {
        id: 'realisation-02',
        src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=900',
        alt: 'Vue chantier avec fondations récentes',
        caption: 'Le terrain dictait les niveaux : on a adapté le plan.',
    },
    {
        id: 'realisation-03',
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900',
        alt: 'Façade de petit bâtiment moderne',
        caption: 'Façade sobre, toiture livrée avec évacuation des eaux.',
    },
    {
        id: 'realisation-04',
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=900',
        alt: 'Intérieur rénové lumineux',
        caption: 'Ouvertures et plancher retrouvés en respectant la maçonnerie.',
    },
    {
        id: 'realisation-06',
        src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=900',
        alt: 'Hall industriel avec charpente métallique',
        caption: 'Je suis les livraisons et les niveaux quand la grue est sur le chantier.',
    },
    {
        id: 'realisation-07',
        src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=900',
        alt: 'Façade moderne en verre et béton',
        caption: 'Je passe sur le terrain avec le casque : sécurité d’abord, puis on avance.',
    },
    {
        id: 'realisation-08',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900',
        alt: 'Espace de bureau aménagé et lumineux',
        caption: 'Le ferraillage est calé ; je valide avant le béton.',
    },
    {
        id: 'realisation-09',
        src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=900',
        alt: 'Maison terminée vue extérieure',
        caption: 'Remise des clés après contrôle des finitions avec le propriétaire.',
    },
    {
        id: 'realisation-10',
        src: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=900',
        alt: 'Plans et outils sur une table de chantier',
        caption: 'Avant de couler, je relie le plan papier à ce qu’on voit sur le sol.',
    },
    {
        id: 'realisation-05',
        src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=900',
        alt: 'Intérieur de bâtiment avec structure apparente',
        caption: 'Je coordonne l’équipe pour que chaque mur soit dans l’axe avant la suite.',
    },
];

export const validateRealisationsData = () => {
    const seenUrls = new Set();
    REALISATIONS_ITEMS.forEach((item) => {
        if (typeof item.src !== 'string' || item.src.length === 0) {
            console.error(`realisations-data: src invalide sur "${item.id}".`);
            return;
        }
        if (seenUrls.has(item.src)) {
            console.error(`realisations-data: URL dupliquée sur "${item.id}".`);
        }
        seenUrls.add(item.src);
    });
};
