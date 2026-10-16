/** Curated list of collection images from the /public directory.
 *  These map to all 89 product images uploaded for 1st Class Creative with commerce details.
 */

export type CollectionCategory =
  | "resin-creations"
  | "wedding-invitations"
  | "cake-boxes"
  | "custom-frames"
  | "keychains"
  | "gift-boxes";

export type PortfolioCategory = CollectionCategory; // Backward compatibility

export interface CollectionItem {
  id: string;
  src: string;
  alt: string;
  category: CollectionCategory;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  featured?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
  tags?: string[];
  leadTime?: string;
  description?: string;
}

export type PortfolioItem = CollectionItem; // Backward compatibility

export const collectionItems: CollectionItem[] = [
  {
    "id": "coll-001",
    "src": "/119202531_1391124051092241_3548837174143876601_n.jpg",
    "alt": "Handcrafted Resin Creation #1 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #1",
    "featured": true,
    "slug": "handcrafted-resin-creation-1-coll-001",
    "price": 1200,
    "originalPrice": 1500,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #1 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-002",
    "src": "/119776466_1391120591092587_3876677633694237943_n.jpg",
    "alt": "Bespoke Wedding Invitation #2 by 1st Class Creative",
    "category": "wedding-invitations",
    "title": "Bespoke Wedding Invitation #2",
    "featured": false,
    "slug": "bespoke-wedding-invitation-2-coll-002",
    "price": 320,
    "originalPrice": 390,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Bespoke Wedding Invitation #2 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-003",
    "src": "/156911660_1521308334740478_3444844858505911641_n.jpg",
    "alt": "Artisanal Wedding Cake Box #3 by 1st Class Creative",
    "category": "cake-boxes",
    "title": "Artisanal Wedding Cake Box #3",
    "featured": false,
    "slug": "artisanal-wedding-cake-box-3-coll-003",
    "price": 420,
    "originalPrice": 520,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Artisanal Wedding Cake Box #3 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-004",
    "src": "/157172376_1521313381406640_7648872103020176230_n.jpg",
    "alt": "Personalized Memory Frame #4 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #4",
    "featured": false,
    "slug": "personalized-memory-frame-4-coll-004",
    "price": 3450,
    "originalPrice": 4250,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #4 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-005",
    "src": "/158447896_1521311458073499_7080739259669651360_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #5 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #5",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-5-coll-005",
    "price": 750,
    "originalPrice": 900,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #5 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-006",
    "src": "/158961515_1521310424740269_5782126401193154074_n.jpg",
    "alt": "Curated Keepsake Gift Box #6 by 1st Class Creative",
    "category": "gift-boxes",
    "title": "Curated Keepsake Gift Box #6",
    "featured": false,
    "slug": "curated-keepsake-gift-box-6-coll-006",
    "price": 3500,
    "originalPrice": 4500,
    "tags": [
      "Luxury Hamper",
      "Keepsake Box",
      "Gift Set"
    ],
    "leadTime": "ships in 2-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Curated Keepsake Gift Box #6 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-007",
    "src": "/171766633_1548760181995293_7479300079852800304_n.jpg",
    "alt": "Handcrafted Resin Creation #7 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #7",
    "featured": false,
    "slug": "handcrafted-resin-creation-7-coll-007",
    "price": 2100,
    "originalPrice": 2400,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #7 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "wi-01",
    "src": "/468396156_2478270609044241_1138043242894587302_n.jpg",
    "alt": "Pink peach wedding invitation set with name tags and envelope",
    "category": "wedding-invitations",
    "title": "Peach Blossom Wedding Invitation",
    "featured": true,
    "slug": "peach-blossom-wedding-invitation-wi-01",
    "price": 560,
    "originalPrice": 630,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Peach Blossom Wedding Invitation created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "wi-02",
    "src": "/468455143_2478273399043962_6736575115530202270_n.jpg",
    "alt": "Elegant wedding invitation design",
    "category": "wedding-invitations",
    "title": "Elegant Wedding Invitation",
    "slug": "elegant-wedding-invitation-wi-02",
    "price": 600,
    "originalPrice": 670,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Elegant Wedding Invitation created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "wi-05",
    "src": "/468866191_2485517644986204_1161136215993109044_n.jpg",
    "alt": "Custom wedding stationery",
    "category": "wedding-invitations",
    "title": "Custom Wedding Stationery",
    "slug": "custom-wedding-stationery-wi-05",
    "price": 640,
    "originalPrice": 710,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Custom Wedding Stationery created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "wi-03",
    "src": "/469596640_2488003968070905_8563215930763090335_n.jpg",
    "alt": "Classic wedding invitation set",
    "category": "wedding-invitations",
    "title": "Classic Wedding Invitation",
    "slug": "classic-wedding-invitation-wi-03",
    "price": 280,
    "originalPrice": 350,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Classic Wedding Invitation created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "wi-04",
    "src": "/469675779_2488004001404235_6025248087151282527_n.jpg",
    "alt": "Floral wedding invitation",
    "category": "wedding-invitations",
    "title": "Floral Wedding Invitation",
    "slug": "floral-wedding-invitation-wi-04",
    "price": 320,
    "originalPrice": 390,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Floral Wedding Invitation created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-013",
    "src": "/480923223_1084832196989360_3864471114539942543_n.jpg",
    "alt": "Handcrafted Resin Creation #13 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #13",
    "featured": false,
    "slug": "handcrafted-resin-creation-13-coll-013",
    "price": 1800,
    "originalPrice": 2100,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #13 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cb-01",
    "src": "/484074106_1098277412311505_6713907112004454121_n.jpg",
    "alt": "Ivory gold embossed cake box with red roses – 1st Class Creative",
    "category": "cake-boxes",
    "title": "Golden Rose Cake Box",
    "featured": true,
    "slug": "golden-rose-cake-box-cb-01",
    "price": 570,
    "originalPrice": 670,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Golden Rose Cake Box created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pk-01",
    "src": "/484810488_1103650881774158_3999044029988274536_n.jpg",
    "alt": "Glitter resin letter keychain with heart charm by 1st Class Creative",
    "category": "keychains",
    "title": "Glitter Letter Keychain",
    "featured": true,
    "slug": "glitter-letter-keychain-pk-01",
    "price": 600,
    "originalPrice": 750,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Glitter Letter Keychain created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pr-03",
    "src": "/484848537_1104255615047018_3576200409442542737_n.jpg",
    "alt": "Resin decorative item",
    "category": "resin-creations",
    "title": "Resin Decorative Piece",
    "slug": "resin-decorative-piece-pr-03",
    "price": 2250,
    "originalPrice": 2550,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Resin Decorative Piece created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-017",
    "src": "/484848542_1103127405159839_6628226941130681639_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #17 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #17",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-17-coll-017",
    "price": 750,
    "originalPrice": 900,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #17 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pr-02",
    "src": "/484940750_1103127701826476_6541623168835759111_n.jpg",
    "alt": "Resin creation art piece",
    "category": "resin-creations",
    "title": "Abstract Resin Art",
    "slug": "abstract-resin-art-pr-02",
    "price": 1350,
    "originalPrice": 1650,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Abstract Resin Art created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pr-04",
    "src": "/485000195_1104243721714874_3965330763027708386_n.jpg",
    "alt": "Custom resin creation",
    "category": "resin-creations",
    "title": "Custom Resin Creation",
    "slug": "custom-resin-creation-pr-04",
    "price": 1500,
    "originalPrice": 1800,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Custom Resin Creation created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pk-03",
    "src": "/485071447_1104905628315350_9185351632911157955_n.jpg",
    "alt": "Custom resin keychain set",
    "category": "keychains",
    "title": "Custom Resin Keychain Set",
    "slug": "custom-resin-keychain-set-pk-03",
    "price": 525,
    "originalPrice": 675,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Resin Keychain Set created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pr-05",
    "src": "/485174433_1103127571826489_2605902498143337743_n.jpg",
    "alt": "Resin art piece with flowers",
    "category": "resin-creations",
    "title": "Floral Resin Art",
    "slug": "floral-resin-art-pr-05",
    "price": 1800,
    "originalPrice": 2100,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Floral Resin Art created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-022",
    "src": "/485179913_1104267678379145_7562870524335838612_n.jpg",
    "alt": "Handcrafted Resin Creation #22 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #22",
    "featured": true,
    "slug": "handcrafted-resin-creation-22-coll-022",
    "price": 1950,
    "originalPrice": 2250,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #22 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pr-01",
    "src": "/485184284_1103127648493148_4472142601649408182_n.jpg",
    "alt": "Ocean resin art coasters on wooden tray",
    "category": "resin-creations",
    "title": "Ocean Resin Coaster Set",
    "featured": true,
    "slug": "ocean-resin-coaster-set-pr-01",
    "price": 2100,
    "originalPrice": 2400,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Ocean Resin Coaster Set created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pk-05",
    "src": "/485406732_1104905618315351_2664544872828850254_n.jpg",
    "alt": "Sparkle resin keychain",
    "category": "keychains",
    "title": "Sparkle Resin Keychain",
    "slug": "sparkle-resin-keychain-pk-05",
    "price": 825,
    "originalPrice": 975,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Sparkle Resin Keychain created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-025",
    "src": "/485622089_1104267558379157_5675909285234318386_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #25 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #25",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-25-coll-025",
    "price": 450,
    "originalPrice": 600,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #25 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-026",
    "src": "/485741983_1103127565159823_5889637417267297553_n.jpg",
    "alt": "Handcrafted Resin Creation #26 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #26",
    "featured": false,
    "slug": "handcrafted-resin-creation-26-coll-026",
    "price": 1350,
    "originalPrice": 1650,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #26 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-027",
    "src": "/485765232_1104263231712923_8476177610582606512_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #27 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #27",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-27-coll-027",
    "price": 600,
    "originalPrice": 750,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #27 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-028",
    "src": "/485872302_1104905374982042_4727709533431856366_n.jpg",
    "alt": "Handcrafted Resin Creation #28 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #28",
    "featured": false,
    "slug": "handcrafted-resin-creation-28-coll-028",
    "price": 1650,
    "originalPrice": 1950,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #28 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cb-02",
    "src": "/485912821_1104266158379297_7626713888688372280_n.jpg",
    "alt": "Elegant cake box with decoration",
    "category": "cake-boxes",
    "title": "Elegant Cake Box",
    "slug": "elegant-cake-box-cb-02",
    "price": 520,
    "originalPrice": 620,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Elegant Cake Box created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-030",
    "src": "/485914720_1105087931630453_8075236399170481825_n.jpg",
    "alt": "Handcrafted Resin Creation #30 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #30",
    "featured": false,
    "slug": "handcrafted-resin-creation-30-coll-030",
    "price": 1950,
    "originalPrice": 2250,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #30 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-031",
    "src": "/485957113_1105349648270948_7744919791725015105_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #31 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #31",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-31-coll-031",
    "price": 450,
    "originalPrice": 600,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #31 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-032",
    "src": "/485964840_1106039001535346_2103214810748975664_n.jpg",
    "alt": "Handcrafted Resin Creation #32 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #32",
    "featured": false,
    "slug": "handcrafted-resin-creation-32-coll-032",
    "price": 2250,
    "originalPrice": 2550,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #32 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pk-04",
    "src": "/486050900_1104905634982016_7559173272180647798_n.jpg",
    "alt": "Pastel resin keychains",
    "category": "keychains",
    "title": "Pastel Resin Keychains",
    "slug": "pastel-resin-keychains-pk-04",
    "price": 600,
    "originalPrice": 750,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Pastel Resin Keychains created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-034",
    "src": "/486076462_1104228065049773_6331095806405358723_n.jpg",
    "alt": "Personalized Memory Frame #34 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #34",
    "featured": false,
    "slug": "personalized-memory-frame-34-coll-034",
    "price": 4150,
    "originalPrice": 4950,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #34 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-035",
    "src": "/486231110_1104927941646452_1826257307246938184_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #35 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #35",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-35-coll-035",
    "price": 750,
    "originalPrice": 900,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #35 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-036",
    "src": "/486253588_1105346561604590_1377687814469372958_n.jpg",
    "alt": "Curated Keepsake Gift Box #36 by 1st Class Creative",
    "category": "gift-boxes",
    "title": "Curated Keepsake Gift Box #36",
    "featured": true,
    "slug": "curated-keepsake-gift-box-36-coll-036",
    "price": 3500,
    "originalPrice": 4500,
    "tags": [
      "Luxury Hamper",
      "Keepsake Box",
      "Gift Set"
    ],
    "leadTime": "ships in 2-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Curated Keepsake Gift Box #36 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-037",
    "src": "/486261283_1105098544962725_8793818307148390633_n.jpg",
    "alt": "Handcrafted Resin Creation #37 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #37",
    "featured": false,
    "slug": "handcrafted-resin-creation-37-coll-037",
    "price": 1800,
    "originalPrice": 2100,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #37 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-038",
    "src": "/486309463_1105087641630482_4150068769331531023_n.jpg",
    "alt": "Bespoke Wedding Invitation #38 by 1st Class Creative",
    "category": "wedding-invitations",
    "title": "Bespoke Wedding Invitation #38",
    "featured": false,
    "slug": "bespoke-wedding-invitation-38-coll-038",
    "price": 560,
    "originalPrice": 630,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Bespoke Wedding Invitation #38 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cb-03",
    "src": "/486329559_1104913934981186_4235712186103867353_n.jpg",
    "alt": "Custom cake box design",
    "category": "cake-boxes",
    "title": "Custom Cake Box",
    "slug": "custom-cake-box-cb-03",
    "price": 620,
    "originalPrice": 720,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Cake Box created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-040",
    "src": "/486345352_1107168411422405_2470304608665801458_n.jpg",
    "alt": "Personalized Memory Frame #40 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #40",
    "featured": false,
    "slug": "personalized-memory-frame-40-coll-040",
    "price": 3800,
    "originalPrice": 4600,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #40 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-041",
    "src": "/486369369_1107623368043576_384359878420182076_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #41 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #41",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-41-coll-041",
    "price": 750,
    "originalPrice": 900,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #41 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cb-04",
    "src": "/486374725_1107174841421762_6927538140018557104_n.jpg",
    "alt": "Cake box with ribbon",
    "category": "cake-boxes",
    "title": "Ribbon Cake Box",
    "slug": "ribbon-cake-box-cb-04",
    "price": 370,
    "originalPrice": 470,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Ribbon Cake Box created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-043",
    "src": "/486398188_1107625454710034_4724520407207505243_n.jpg",
    "alt": "Handcrafted Resin Creation #43 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #43",
    "featured": true,
    "slug": "handcrafted-resin-creation-43-coll-043",
    "price": 1500,
    "originalPrice": 1800,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #43 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-044",
    "src": "/486471342_1107089224763657_2893278372528059943_n.jpg",
    "alt": "Bespoke Wedding Invitation #44 by 1st Class Creative",
    "category": "wedding-invitations",
    "title": "Bespoke Wedding Invitation #44",
    "featured": false,
    "slug": "bespoke-wedding-invitation-44-coll-044",
    "price": 400,
    "originalPrice": 470,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Bespoke Wedding Invitation #44 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-045",
    "src": "/486487982_1107168388089074_8012206436175099479_n.jpg",
    "alt": "Artisanal Wedding Cake Box #45 by 1st Class Creative",
    "category": "cake-boxes",
    "title": "Artisanal Wedding Cake Box #45",
    "featured": false,
    "slug": "artisanal-wedding-cake-box-45-coll-045",
    "price": 520,
    "originalPrice": 620,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Artisanal Wedding Cake Box #45 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-046",
    "src": "/486568673_1107186438087269_7847135618439782997_n.jpg",
    "alt": "Personalized Memory Frame #46 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #46",
    "featured": false,
    "slug": "personalized-memory-frame-46-coll-046",
    "price": 3450,
    "originalPrice": 4250,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #46 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-047",
    "src": "/486777261_1110285427777370_7864124385854547217_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #47 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #47",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-47-coll-047",
    "price": 750,
    "originalPrice": 900,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #47 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cb-05",
    "src": "/487146562_1110427371096509_6761094454698884201_n.jpg",
    "alt": "Decorative cake box",
    "category": "cake-boxes",
    "title": "Decorative Cake Box",
    "slug": "decorative-cake-box-cb-05",
    "price": 670,
    "originalPrice": 770,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Decorative Cake Box created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-049",
    "src": "/487188865_1110286251110621_3814942117047327856_n.jpg",
    "alt": "Handcrafted Resin Creation #49 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #49",
    "featured": false,
    "slug": "handcrafted-resin-creation-49-coll-049",
    "price": 1200,
    "originalPrice": 1500,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #49 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-050",
    "src": "/487297334_1110615804410999_6980722243302185037_n.jpg",
    "alt": "Bespoke Wedding Invitation #50 by 1st Class Creative",
    "category": "wedding-invitations",
    "title": "Bespoke Wedding Invitation #50",
    "featured": true,
    "slug": "bespoke-wedding-invitation-50-coll-050",
    "price": 640,
    "originalPrice": 710,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Bespoke Wedding Invitation #50 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-051",
    "src": "/487303037_1110439261095320_4487435099871524944_n.jpg",
    "alt": "Artisanal Wedding Cake Box #51 by 1st Class Creative",
    "category": "cake-boxes",
    "title": "Artisanal Wedding Cake Box #51",
    "featured": false,
    "slug": "artisanal-wedding-cake-box-51-coll-051",
    "price": 420,
    "originalPrice": 520,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Artisanal Wedding Cake Box #51 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-052",
    "src": "/487424947_1111188621020384_7907270091276761238_n.jpg",
    "alt": "Personalized Memory Frame #52 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #52",
    "featured": false,
    "slug": "personalized-memory-frame-52-coll-052",
    "price": 3100,
    "originalPrice": 3900,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #52 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-053",
    "src": "/487457136_1110673351071911_3022154755237038742_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #53 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #53",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-53-coll-053",
    "price": 750,
    "originalPrice": 900,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #53 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-054",
    "src": "/487513255_1111188647687048_5618984450600090015_n.jpg",
    "alt": "Curated Keepsake Gift Box #54 by 1st Class Creative",
    "category": "gift-boxes",
    "title": "Curated Keepsake Gift Box #54",
    "featured": false,
    "slug": "curated-keepsake-gift-box-54-coll-054",
    "price": 5000,
    "originalPrice": 6000,
    "tags": [
      "Luxury Hamper",
      "Keepsake Box",
      "Gift Set"
    ],
    "leadTime": "ships in 2-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Curated Keepsake Gift Box #54 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-055",
    "src": "/488182555_1116650863807493_6718943019304588739_n.jpg",
    "alt": "Handcrafted Resin Creation #55 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #55",
    "featured": false,
    "slug": "handcrafted-resin-creation-55-coll-055",
    "price": 2100,
    "originalPrice": 2400,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #55 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-056",
    "src": "/488654893_1116653440473902_3684161952889108798_n.jpg",
    "alt": "Bespoke Wedding Invitation #56 by 1st Class Creative",
    "category": "wedding-invitations",
    "title": "Bespoke Wedding Invitation #56",
    "featured": false,
    "slug": "bespoke-wedding-invitation-56-coll-056",
    "price": 480,
    "originalPrice": 550,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Bespoke Wedding Invitation #56 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cb-06",
    "src": "/492230064_1130880099051236_6148917703186432318_n.jpg",
    "alt": "Special occasion cake box",
    "category": "cake-boxes",
    "title": "Special Occasion Cake Box",
    "slug": "special-occasion-cake-box-cb-06",
    "price": 320,
    "originalPrice": 420,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Special Occasion Cake Box created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-058",
    "src": "/492676831_1133978152074764_793046894524764765_n.jpg",
    "alt": "Personalized Memory Frame #58 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #58",
    "featured": false,
    "slug": "personalized-memory-frame-58-coll-058",
    "price": 2750,
    "originalPrice": 3550,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #58 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cf-06",
    "src": "/524992618_1206708381468407_4955519291548085077_n.jpg",
    "alt": "Custom photo frame creation",
    "category": "custom-frames",
    "title": "Custom Photo Frame",
    "slug": "custom-photo-frame-cf-06",
    "price": 3100,
    "originalPrice": 3900,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Photo Frame created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cf-05",
    "src": "/527823467_1212219187583993_309434352382864918_n.jpg",
    "alt": "Special occasion frame",
    "category": "custom-frames",
    "title": "Special Occasion Frame",
    "slug": "special-occasion-frame-cf-05",
    "price": 3450,
    "originalPrice": 4250,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Special Occasion Frame created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cf-04",
    "src": "/528129243_1214777417328170_6197078429609711030_n.jpg",
    "alt": "Decorated anniversary frame",
    "category": "custom-frames",
    "title": "Decorated Anniversary Frame",
    "slug": "decorated-anniversary-frame-cf-04",
    "price": 3800,
    "originalPrice": 4600,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Decorated Anniversary Frame created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-062",
    "src": "/528173490_1211943340944911_8217022456074979423_n.jpg",
    "alt": "Personalized Memory Frame #62 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #62",
    "featured": false,
    "slug": "personalized-memory-frame-62-coll-062",
    "price": 4150,
    "originalPrice": 4950,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #62 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cf-08",
    "src": "/528693128_1214770947328817_477929606592102439_n.jpg",
    "alt": "Decorated memory frame",
    "category": "custom-frames",
    "title": "Memory Frame",
    "slug": "memory-frame-cf-08",
    "price": 4500,
    "originalPrice": 5300,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Memory Frame created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cf-01",
    "src": "/529179520_1214465350692710_3362134301413191237_n.jpg",
    "alt": "Custom anniversary photo frame with floral decoration by 1st Class Creative",
    "category": "custom-frames",
    "title": "Anniversary Custom Frame",
    "featured": true,
    "slug": "anniversary-custom-frame-cf-01",
    "price": 2400,
    "originalPrice": 3200,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Anniversary Custom Frame created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-065",
    "src": "/529270984_1215490470590198_1004296300899846422_n.jpg",
    "alt": "Personalized Memory Frame #65 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #65",
    "featured": false,
    "slug": "personalized-memory-frame-65-coll-065",
    "price": 2750,
    "originalPrice": 3550,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #65 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cf-07",
    "src": "/530267716_1214770983995480_7709955081936643237_n.jpg",
    "alt": "Personalized frame with lights",
    "category": "custom-frames",
    "title": "Personalized Light Frame",
    "slug": "personalized-light-frame-cf-07",
    "price": 3100,
    "originalPrice": 3900,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Personalized Light Frame created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-067",
    "src": "/534996265_1223121036493808_3077054981976171579_n.jpg",
    "alt": "Handcrafted Resin Creation #67 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #67",
    "featured": false,
    "slug": "handcrafted-resin-creation-67-coll-067",
    "price": 1500,
    "originalPrice": 1800,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #67 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-068",
    "src": "/541877599_1238633561609222_7200771316438147948_n.jpg",
    "alt": "Bespoke Wedding Invitation #68 by 1st Class Creative",
    "category": "wedding-invitations",
    "title": "Bespoke Wedding Invitation #68",
    "featured": false,
    "slug": "bespoke-wedding-invitation-68-coll-068",
    "price": 560,
    "originalPrice": 630,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Bespoke Wedding Invitation #68 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pk-06",
    "src": "/542751225_1238632091609369_5301087910891703266_n.jpg",
    "alt": "Mixed colour letter resin keychains",
    "category": "keychains",
    "title": "Mixed Colour Letter Keychains",
    "slug": "mixed-colour-letter-keychains-pk-06",
    "price": 600,
    "originalPrice": 750,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Mixed Colour Letter Keychains created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pk-02",
    "src": "/542752181_1238639424941969_1583669488507158905_n.jpg",
    "alt": "Colourful personalised resin letter keychains collection",
    "category": "keychains",
    "title": "Personalised Letter Keychains",
    "featured": true,
    "slug": "personalised-letter-keychains-pk-02",
    "price": 675,
    "originalPrice": 825,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Personalised Letter Keychains created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pr-06",
    "src": "/542752928_1239676304838281_1085407903453986207_n.jpg",
    "alt": "Special resin creation",
    "category": "resin-creations",
    "title": "Special Resin Creation",
    "slug": "special-resin-creation-pr-06",
    "price": 2100,
    "originalPrice": 2400,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Special Resin Creation created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-072",
    "src": "/542754722_1238633568275888_3222908178046943019_n.jpg",
    "alt": "Handcrafted Resin Creation #72 by 1st Class Creative",
    "category": "resin-creations",
    "title": "Handcrafted Resin Creation #72",
    "featured": false,
    "slug": "handcrafted-resin-creation-72-coll-072",
    "price": 2250,
    "originalPrice": 2550,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Handcrafted Resin Creation #72 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pr-07",
    "src": "/542761575_1238637001608878_8607990700312666146_n.jpg",
    "alt": "Colourful resin design",
    "category": "resin-creations",
    "title": "Colourful Resin Design",
    "slug": "colourful-resin-design-pr-07",
    "price": 1200,
    "originalPrice": 1500,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Colourful Resin Design created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pk-07",
    "src": "/543123096_1238637104942201_1667295338167499961_n.jpg",
    "alt": "Name resin keychain craft",
    "category": "keychains",
    "title": "Name Resin Keychain",
    "slug": "name-resin-keychain-pk-07",
    "price": 525,
    "originalPrice": 675,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Name Resin Keychain created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pk-08",
    "src": "/543439793_1238632114942700_5237334051114249978_n.jpg",
    "alt": "Heart shaped resin keychain",
    "category": "keychains",
    "title": "Heart Resin Keychain",
    "slug": "heart-resin-keychain-pk-08",
    "price": 600,
    "originalPrice": 750,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Heart Resin Keychain created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pr-09",
    "src": "/543548920_1238639361608642_3914618814832804184_n.jpg",
    "alt": "Artistic resin work",
    "category": "resin-creations",
    "title": "Artistic Resin Work",
    "slug": "artistic-resin-work-pr-09",
    "price": 1650,
    "originalPrice": 1950,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Artistic Resin Work created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "pr-08",
    "src": "/544379059_1238639354941976_6083356652451169623_n.jpg",
    "alt": "Decorative resin piece",
    "category": "resin-creations",
    "title": "Decorative Resin Piece",
    "slug": "decorative-resin-piece-pr-08",
    "price": 1800,
    "originalPrice": 2100,
    "tags": [
      "Resin Art",
      "Handmade",
      "Home Décor"
    ],
    "leadTime": "ships in 2-3 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Decorative Resin Piece created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cb-07",
    "src": "/545387736_1241483364657575_1531938091476661597_n.jpg",
    "alt": "Premium cake packaging box",
    "category": "cake-boxes",
    "title": "Premium Cake Box",
    "slug": "premium-cake-box-cb-07",
    "price": 570,
    "originalPrice": 670,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Premium Cake Box created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cb-08",
    "src": "/546986139_1243868417752403_7353421821696443066_n.jpg",
    "alt": "Elegant cake box with floral accent",
    "category": "cake-boxes",
    "title": "Floral Accent Cake Box",
    "slug": "floral-accent-cake-box-cb-08",
    "price": 620,
    "originalPrice": 720,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Floral Accent Cake Box created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-080",
    "src": "/547216973_1243065057832739_5502992834488684501_n.jpg",
    "alt": "Bespoke Wedding Invitation #80 by 1st Class Creative",
    "category": "wedding-invitations",
    "title": "Bespoke Wedding Invitation #80",
    "featured": false,
    "slug": "bespoke-wedding-invitation-80-coll-080",
    "price": 640,
    "originalPrice": 710,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Bespoke Wedding Invitation #80 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-081",
    "src": "/553709196_1254657160006862_297369647191627209_n.jpg",
    "alt": "Artisanal Wedding Cake Box #81 by 1st Class Creative",
    "category": "cake-boxes",
    "title": "Artisanal Wedding Cake Box #81",
    "featured": false,
    "slug": "artisanal-wedding-cake-box-81-coll-081",
    "price": 320,
    "originalPrice": 420,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Artisanal Wedding Cake Box #81 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-082",
    "src": "/557752144_1260361246103120_2355556864129229973_n.jpg",
    "alt": "Personalized Memory Frame #82 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #82",
    "featured": false,
    "slug": "personalized-memory-frame-82-coll-082",
    "price": 3800,
    "originalPrice": 4600,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #82 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cf-03",
    "src": "/557802403_1265990468873531_7381377988699630798_n.jpg",
    "alt": "Happy wedding photo frame with resin letters and flowers",
    "category": "custom-frames",
    "title": "Wedding Memory Frame",
    "featured": true,
    "slug": "wedding-memory-frame-cf-03",
    "price": 4150,
    "originalPrice": 4950,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Wedding Memory Frame created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "cf-02",
    "src": "/626581418_1362772269195350_2007381266795301988_n.jpg",
    "alt": "Love photo shadow box with red roses",
    "category": "custom-frames",
    "title": "Love Shadow Box Frame",
    "featured": true,
    "slug": "love-shadow-box-frame-cf-02",
    "price": 4500,
    "originalPrice": 5300,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Love Shadow Box Frame created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "wi-06",
    "src": "/69542278_1078684385669544_1247969654853337088_n.jpg",
    "alt": "Early wedding invitation design",
    "category": "wedding-invitations",
    "title": "Vintage Wedding Invitation",
    "slug": "vintage-wedding-invitation-wi-06",
    "price": 440,
    "originalPrice": 510,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Vintage Wedding Invitation created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-086",
    "src": "/71181109_1101373763400606_1289558050813771776_n.jpg",
    "alt": "Bespoke Wedding Invitation #86 by 1st Class Creative",
    "category": "wedding-invitations",
    "title": "Bespoke Wedding Invitation #86",
    "featured": false,
    "slug": "bespoke-wedding-invitation-86-coll-086",
    "price": 480,
    "originalPrice": 550,
    "tags": [
      "Wedding Suite",
      "Gold Foil",
      "Custom Printing"
    ],
    "leadTime": "ships in 5-7 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Bespoke Wedding Invitation #86 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-087",
    "src": "/71283478_1101371230067526_6369915191253008384_n.jpg",
    "alt": "Artisanal Wedding Cake Box #87 by 1st Class Creative",
    "category": "cake-boxes",
    "title": "Artisanal Wedding Cake Box #87",
    "featured": false,
    "slug": "artisanal-wedding-cake-box-87-coll-087",
    "price": 620,
    "originalPrice": 720,
    "tags": [
      "Embossed Gold",
      "Cake Favor",
      "Celebration"
    ],
    "leadTime": "ships in 3-4 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Artisanal Wedding Cake Box #87 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-088",
    "src": "/71291339_1104334186437897_3870964568305958912_n.jpg",
    "alt": "Personalized Memory Frame #88 by 1st Class Creative",
    "category": "custom-frames",
    "title": "Personalized Memory Frame #88",
    "featured": false,
    "slug": "personalized-memory-frame-88-coll-088",
    "price": 3450,
    "originalPrice": 4250,
    "tags": [
      "LED Frame",
      "Anniversary",
      "Memory Keepsake"
    ],
    "leadTime": "ships in 3-5 days",
    "isBestSeller": true,
    "inStock": true,
    "description": "Handcrafted Personalized Memory Frame #88 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  },
  {
    "id": "coll-089",
    "src": "/71825009_1104332903104692_2189076356107599872_n.jpg",
    "alt": "Custom Alphabet Resin Keychain #89 by 1st Class Creative",
    "category": "keychains",
    "title": "Custom Alphabet Resin Keychain #89",
    "featured": false,
    "slug": "custom-alphabet-resin-keychain-89-coll-089",
    "price": 750,
    "originalPrice": 900,
    "tags": [
      "Personalized",
      "Alphabet",
      "Glitter Gift"
    ],
    "leadTime": "ships in 1-2 days",
    "isBestSeller": false,
    "inStock": true,
    "description": "Handcrafted Custom Alphabet Resin Keychain #89 created with premium epoxy resin, gold accents, and bespoke personalization by 1st Class Creative Craft studio."
  }
];

export const portfolioItems = collectionItems; // Backward compatibility alias

export const featuredItems = collectionItems.filter((i) => i.featured);

export const categoryLabels: Record<CollectionCategory, string> = {
  "resin-creations": "Resin Creations",
  "wedding-invitations": "Wedding Invitations",
  "cake-boxes": "Cake Boxes",
  "custom-frames": "Custom Frames",
  keychains: "Resin Keychains",
  "gift-boxes": "Gift Boxes",
};
