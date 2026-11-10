export const ETAPES_PROJETS = [
    {
        id: 'avant',
        title: 'Avant la première pierre',
        previewText:
            'Avant de couler la moindre fondation, je prends le temps de vous écouter, de marcher sur le terrain et de vous montrer le projet en plans et en 3D.',
        previewImage: {
            src: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800',
            alt: 'Plans et esquisses de projet avant chantier',
        },
        detailHeroImage: {
            src: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1280',
            alt: 'Table de travail avec plans architecturaux',
        },
        substeps: [
            {
                id: 'etape-avant-discussion',
                title: 'Discussion avec vous sur le projet',
                body:
                    'Je vous rencontre pour comprendre votre budget, vos envies et la faisabilité sur votre terrain. Je vous réponds sans jargon : ce qui est possible, ce qui l’est moins, et ce que je peux garantir.',
                image: {
                    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
                    alt: 'Échange entre client et professionnel sur un projet',
                },
            },
            {
                id: 'etape-avant-visite',
                title: 'Visite du site et du terrain',
                body:
                    'Je me déplace sur place pour observer le sol, les accès, l’ensoleillement et les contraintes réelles. C’est ce que je vois ici qui guide mes plans — pas l’inverse.',
                image: {
                    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
                    alt: 'Terrain et relevé de site',
                },
            },
            {
                id: 'etape-avant-plan',
                title: 'Création du plan et visualisation 3D',
                body:
                    'Je rédige les plans puis je vous montre des vues 3D de la maison telle qu’elle sera construite. Vous pouvez vous projeter, discuter des volumes et ajuster avant la première pierre.',
                image: {
                    src: 'assets/images/maquette-3d-vue-ensemble.jpg',
                    alt: 'Vue d’ensemble du projet en modélisation 3D',
                },
            },
        ],
    },
    {
        id: 'construction',
        title: 'Au cœur de la construction',
        previewText:
            'Sur le chantier, je pilote les équipes, je vous tiens informé et j’anticipe les imprévus avec vous.',
        previewImage: {
            src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
            alt: 'Chantier de construction en cours',
        },
        detailHeroImage: {
            src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1280',
            alt: 'Structure de bâtiment en construction',
        },
        detailLead:
            'Je ne travaille pas avec n’importe qui : je m’entoure de maçons, ferrailleurs et électriciens que je connais, dont j’ai vérifié le savoir-faire. C’est ainsi que je tiens la qualité promise sur vos plans.',
        substeps: [
            {
                id: 'etape-chantier-travail',
                title: 'Le travail sur les chantiers',
                body:
                    'Je suis présent pour vérifier le gros œuvre, les armatures et les finitions critiques. Chaque étape est contrôlée avant de passer à la suivante.',
                image: {
                    src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
                    alt: 'Ingénieur sur chantier',
                },
            },
            {
                id: 'etape-chantier-rapports',
                title: 'Des nouvelles régulières pour vous',
                body:
                    'Vous recevez des points d’avancement clairs : photos, prochaines étapes et délais réalistes. Vous n’êtes jamais dans le flou sur ce qui se passe sur votre maison.',
                image: {
                    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
                    alt: 'Revue de projet et suivi',
                },
            },
            {
                id: 'etape-chantier-imprevus',
                title: 'Gestion des imprévus avec vous',
                body:
                    'Sol, météo ou retard de matériaux : quand un imprévu arrive, je vous explique les options et les coûts avant d’agir. Rien n’est décidé à votre place sans votre accord.',
                image: {
                    src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
                    alt: 'Chantier avec équipe et coordination',
                },
            },
        ],
    },
    {
        id: 'vie',
        title: 'Le projet prend vie',
        previewText:
            'Livraison, photos de la maison terminée et ma garantie d’ingénieur de dix ans pour votre tranquillité d’esprit.',
        previewImage: {
            src: 'assets/images/maquette-3d-vue-facade.jpg',
            alt: 'Façade du projet achevé ou visualisée',
        },
        detailHeroImage: {
            src: 'assets/images/maquette-3d-vue-facade.jpg',
            alt: 'Maison livrée — façade terminée',
        },
        substeps: [
            {
                id: 'etape-vie-livraison',
                title: 'La maison livrée',
                body:
                    'Je contrôle les finitions avec vous avant la remise des clés. Vous recevez une maison prête à habiter, construite selon les plans que nous avons validés ensemble.',
                image: {
                    src: 'assets/images/maquette-3d-vue-entree.jpg',
                    alt: 'Entrée et accueil de la maison livrée',
                },
            },
            {
                id: 'etape-vie-garantie',
                title: 'Ma garantie de dix ans',
                body:
                    'Je vous offre une garantie de dix ans après la livraison sur les ouvrages que j’ai suivis. Si un problème apparaît, vous savez qui appeler — pas une liste de sous-traitants introuvables.',
                image: {
                    src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
                    alt: 'Maison moderne terminée — symbole de livraison sereine',
                },
            },
        ],
    },
];

export const getPhaseById = (phaseId) => ETAPES_PROJETS.find((phase) => phase.id === phaseId);
