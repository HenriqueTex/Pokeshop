import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Collection from '#models/collection'
import Product from '#models/product'
import PromotionalBanner from '#models/promotional_banner'
import Admin from '#models/admin'
import env from '#start/env'

export default class extends BaseSeeder {
  async run() {
    const celebracao30Anos = await Collection.updateOrCreate(
      { slug: 'celebracao-de-30-anos' },
      {
        name: 'Celebração de 30 Anos',
        description: 'Três décadas de Pokémon celebradas em produtos especiais e cartas marcantes.',
        imageUrl: '/media/celebra%C3%A7%C3%A3o-30-anos.jpg',
        bannerUrl: '/media/celebra%C3%A7%C3%A3o-30-anos.jpg',
        sortOrder: 1,
        isPublished: true,
      }
    )

    const now = DateTime.now()
    const celebrationImage =
      'https://mcdn.pokemon.com/image/upload/c_limit,w_1439/f_auto/q_auto:best/v1/live/pcom-cms/static-assets/cms3/br/img/trading-card-game/tiles/30th/product-showcase/30th-product-showcase-169-br.png'
    const celebrationProductImages: Record<string, string> = {
      'celebracao-30-anos-blister-duplo-com-moeda': '/media/2-pack-blister-br.avif',
      'celebracao-30-anos-blister-triplo-com-adesivo': '/media/tech-sticker-collection-br.avif',
      'celebracao-30-anos-treinador-avancado': '/media/elite-trainer-box-br.avif',
      'celebracao-30-anos-box-com-poster': '/media/poster-collection-br.avif',
      'celebracao-30-anos-box-colecao-com-fichario': '/media/Bindedr.avif',
      'celebracao-30-anos-box-ex-sylveon': '/media/pokemon-ex-box-sylveon-ex-greninja-ex-br.avif',
      'celebracao-30-anos-box-ex-greninja': '/media/pokemon-ex-box-sylveon-ex-greninja-ex-br.avif',
      'celebracao-30-anos-combo-de-booster': '/media/booster-bundle-br.avif',
      'celebracao-30-anos-baralho-de-batalha-espeon-ex':
        '/media/battle-deck-espeon-ex-umbreon-ex-br.avif',
      'celebracao-30-anos-baralho-de-batalha-umbreon-ex':
        '/media/battle-deck-espeon-ex-umbreon-ex-br.avif',
      'celebracao-30-anos-minilata': '/media/mini-tin.avif',
      'celebracao-30-anos-box-colecao-com-miniatura-mewtwo':
        '/media/figure-collection-mew-mewtwo-br.avif',
      'celebracao-30-anos-box-colecao-com-miniatura-mew':
        '/media/figure-collection-mew-mewtwo-br.avif',
    }
    const celebrationProducts = [
      {
        slug: 'celebracao-30-anos-blister-duplo-com-moeda',
        name: 'Celebração de 30 Anos — Blister Duplo com Moeda',
        description: 'Dois boosters da Celebração de 30 Anos, carta promocional e moeda Pokémon.',
        priceCents: 6999,
        productType: 'blister',
        releaseDate: DateTime.fromISO('2026-09-16'),
      },
      {
        slug: 'celebracao-30-anos-blister-triplo-com-adesivo',
        name: 'Celebração de 30 Anos — Blister Triplo com Adesivo',
        description: 'Três boosters da coleção acompanhados de uma cartela de adesivos.',
        priceCents: 9999,
        productType: 'blister',
        releaseDate: DateTime.fromISO('2026-09-16'),
      },
      {
        slug: 'celebracao-30-anos-treinador-avancado',
        name: 'Celebração de 30 Anos — Coleção Treinador Avançado',
        description:
          'Nove boosters, acessórios de jogo, protetores, moeda e carta para o Pokémon TCG Live.',
        priceCents: 39999,
        productType: 'elite-trainer-box',
        releaseDate: DateTime.fromISO('2026-09-16'),
      },
      {
        slug: 'celebracao-30-anos-box-com-poster',
        name: 'Celebração de 30 Anos — Box com Pôster',
        description: 'Box com pôster e cartas promocionais dos três pássaros lendários de Kanto.',
        priceCents: 11599,
        productType: 'collection-box',
        releaseDate: DateTime.fromISO('2026-09-16'),
      },
      {
        slug: 'celebracao-30-anos-box-colecao-com-fichario',
        name: 'Celebração de 30 Anos — Box Coleção com Fichário',
        description: 'Fichário de nove bolsos e boosters da coleção para começar a sua celebração.',
        priceCents: 23099,
        productType: 'collection-box',
        releaseDate: DateTime.fromISO('2026-09-16'),
      },
      {
        slug: 'celebracao-30-anos-box-ex-sylveon',
        name: 'Celebração de 30 Anos — Box ex Sylveon ex',
        description:
          'Carta promocional Sylveon ex, carta extragrande e boosters da Celebração de 30 Anos.',
        priceCents: 16999,
        productType: 'collection-box',
        releaseDate: DateTime.fromISO('2026-09-16'),
      },
      {
        slug: 'celebracao-30-anos-box-ex-greninja',
        name: 'Celebração de 30 Anos — Box ex Greninja ex',
        description:
          'Carta promocional Greninja ex, carta extragrande e boosters da Celebração de 30 Anos.',
        priceCents: 16999,
        productType: 'collection-box',
        releaseDate: DateTime.fromISO('2026-09-16'),
      },
      {
        slug: 'celebracao-30-anos-combo-de-booster',
        name: 'Celebração de 30 Anos — Combo de Booster',
        description: 'Seis boosters da Celebração de 30 Anos para ampliar sua coleção.',
        priceCents: 19999,
        productType: 'booster-box',
        releaseDate: DateTime.fromISO('2026-10-02'),
      },
      {
        slug: 'celebracao-30-anos-baralho-de-batalha-espeon-ex',
        name: 'Celebração de 30 Anos — Baralho de Batalha Espeon ex',
        description: 'Baralho laminado de 60 cartas com Espeon ex, moeda e deckbox.',
        priceCents: 11599,
        productType: 'deck',
        releaseDate: DateTime.fromISO('2026-10-30'),
      },
      {
        slug: 'celebracao-30-anos-baralho-de-batalha-umbreon-ex',
        name: 'Celebração de 30 Anos — Baralho de Batalha Umbreon ex',
        description: 'Baralho laminado de 60 cartas com Umbreon ex, moeda e deckbox.',
        priceCents: 11599,
        productType: 'deck',
        releaseDate: DateTime.fromISO('2026-10-30'),
      },
      {
        slug: 'celebracao-30-anos-minilata',
        name: 'Celebração de 30 Anos — Minilata',
        description:
          'Minilata colecionável, disponível em dez estampas, com boosters e itens extras.',
        priceCents: 7799,
        productType: 'tin',
        releaseDate: DateTime.fromISO('2026-11-06'),
      },
      {
        slug: 'celebracao-30-anos-box-colecao-com-miniatura-mewtwo',
        name: 'Celebração de 30 Anos — Box Coleção com Miniatura Mewtwo',
        description:
          'Box com carta promocional, carta extragrande, miniatura de Mewtwo e cinco boosters.',
        priceCents: 24599,
        productType: 'collection-box',
        releaseDate: DateTime.fromISO('2026-11-06'),
      },
      {
        slug: 'celebracao-30-anos-box-colecao-com-miniatura-mew',
        name: 'Celebração de 30 Anos — Box Coleção com Miniatura Mew',
        description:
          'Box com carta promocional, carta extragrande, miniatura de Mew e cinco boosters.',
        priceCents: 24599,
        productType: 'collection-box',
        releaseDate: DateTime.fromISO('2026-11-06'),
      },
      {
        slug: 'celebracao-30-anos-box-colecao-premium-ditto',
        name: 'Celebração de 30 Anos — Box Coleção Premium Porta-Retrato Ditto',
        description:
          'Coleção premium com display de Ditto e oito boosters da Celebração de 30 Anos.',
        priceCents: 30599,
        productType: 'collection-box',
        releaseDate: DateTime.fromISO('2026-11-06'),
      },
      {
        slug: 'celebracao-30-anos-box-colecao',
        name: 'Celebração de 30 Anos — Box Coleção',
        description:
          'A coleção de ponta nacional com 19 boosters, booster especial clássico, promos e organizadores.',
        priceCents: 59999,
        productType: 'collection-box',
        releaseDate: DateTime.fromISO('2026-11-06'),
      },
    ]
    const featuredProductSlugs = new Set([
      'celebracao-30-anos-treinador-avancado',
      'celebracao-30-anos-box-com-poster',
      'celebracao-30-anos-combo-de-booster',
    ])

    await Product.query()
      .whereNotIn(
        'slug',
        celebrationProducts.map((product) => product.slug)
      )
      .delete()
    await Collection.query().whereNot('slug', 'celebracao-de-30-anos').delete()

    for (const celebrationProduct of celebrationProducts) {
      const product = await Product.updateOrCreate(
        { slug: celebrationProduct.slug },
        {
          ...celebrationProduct,
          coverImageUrl: celebrationProductImages[celebrationProduct.slug] ?? celebrationImage,
          stock: 10,
          status: 'published',
          isFeatured: featuredProductSlugs.has(celebrationProduct.slug),
          publishedAt: now,
        }
      )

      await product.related('collections').sync([celebracao30Anos.id])
    }

    await PromotionalBanner.updateOrCreate(
      { title: 'O próximo capítulo da sua coleção' },
      {
        subtitle: 'Novas coleções, cartas raras e itens para cada aventura.',
        ctaLabel: 'Explorar catálogo',
        ctaUrl: '/catalogo',
        imageUrl: '/media/splash-final.jpeg',
        isActive: true,
        sortOrder: 1,
      }
    )

    const adminEmail = env.get('ADMIN_EMAIL')
    const adminPassword = env.get('ADMIN_PASSWORD')
    if (adminEmail && adminPassword) {
      const admin = await Admin.findBy('email', adminEmail)
      if (!admin) {
        await Admin.create({
          name: 'Administrador Triade Arte',
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
          isActive: true,
        })
      }
    }
  }
}
