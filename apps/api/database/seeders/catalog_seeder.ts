import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Collection from '#models/collection'
import Product from '#models/product'
import PromotionalBanner from '#models/promotional_banner'
import Admin from '#models/admin'
import env from '#start/env'

export default class extends BaseSeeder {
  async run() {
    const paldea = await Collection.updateOrCreate(
      { slug: 'destinos-de-paldea' },
      {
        name: 'Destinos de Paldea',
        description: 'Uma coleção vibrante para abrir, jogar e guardar.',
        sortOrder: 2,
        isPublished: true,
      }
    )
    const evolucoes = await Collection.updateOrCreate(
      { slug: 'evolucoes-em-paldea' },
      {
        name: 'Evoluções em Paldea',
        description: 'Uma jornada pelas evoluções que marcaram uma geração.',
        sortOrder: 3,
        isPublished: true,
      }
    )
    const classicos = await Collection.updateOrCreate(
      { slug: 'classicos-da-triade' },
      {
        name: 'Clássicos da Triade',
        description: 'Peças selecionadas para colecionadores.',
        sortOrder: 4,
        isPublished: true,
      }
    )
    const celebracao30Anos = await Collection.updateOrCreate(
      { slug: 'celebracao-de-30-anos' },
      {
        name: 'Celebração de 30 Anos',
        description: 'Três décadas de Pokémon celebradas em produtos especiais e cartas marcantes.',
        imageUrl:
          'https://mcdn.pokemon.com/image/upload/c_limit,w_1439/f_auto/q_auto:best/v1/live/pcom-cms/static-assets/cms3/br/img/trading-card-game/tiles/30th/product-showcase/30th-product-showcase-169-br.png',
        bannerUrl:
          'https://mcdn.pokemon.com/image/upload/c_limit,w_1439/f_auto/q_auto:best/v1/live/pcom-cms/static-assets/cms3/br/img/trading-card-game/tiles/30th/product-showcase/30th-product-showcase-169-br.png',
        sortOrder: 1,
        isPublished: true,
      }
    )

    const now = DateTime.now()
    const booster = await Product.updateOrCreate(
      { slug: 'booster-box-destinos-de-paldea' },
      {
        name: 'Booster Box Destinos de Paldea',
        description: 'Uma caixa com boosters para descobrir novas cartas e raridades.',
        priceCents: 89990,
        stock: 12,
        status: 'published',
        productType: 'booster',
        releaseDate: DateTime.fromISO('2025-02-01'),
        isFeatured: true,
        publishedAt: now,
      }
    )
    const etb = await Product.updateOrCreate(
      { slug: 'elite-trainer-box-evolucoes-em-paldea' },
      {
        name: 'Elite Trainer Box Evoluções em Paldea',
        description: 'Tudo que você precisa para começar sua próxima batalha.',
        priceCents: 52990,
        stock: 8,
        status: 'published',
        productType: 'elite-trainer-box',
        releaseDate: DateTime.fromISO('2025-01-18'),
        isFeatured: true,
        publishedAt: now,
      }
    )
    const binder = await Product.updateOrCreate(
      { slug: 'fichario-premium-triade-arte' },
      {
        name: 'Fichário Premium Triade Arte',
        description: 'Proteção elegante para as cartas que contam sua história.',
        priceCents: 18990,
        stock: 20,
        status: 'published',
        productType: 'acessorio',
        releaseDate: DateTime.fromISO('2024-12-05'),
        isFeatured: false,
        publishedAt: now,
      }
    )

    await booster.related('collections').sync([paldea.id])
    await etb.related('collections').sync([evolucoes.id])
    await binder.related('collections').sync([classicos.id])

    const celebrationImage =
      'https://mcdn.pokemon.com/image/upload/c_limit,w_1439/f_auto/q_auto:best/v1/live/pcom-cms/static-assets/cms3/br/img/trading-card-game/tiles/30th/product-showcase/30th-product-showcase-169-br.png'
    const celebrationEtbImage =
      'https://feenturm.de/cdn/shop/files/Pokemon_TCG_30th_Celebration_ETB_converted.webp?v=1783074720'
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

    for (const celebrationProduct of celebrationProducts) {
      const product = await Product.updateOrCreate(
        { slug: celebrationProduct.slug },
        {
          ...celebrationProduct,
          coverImageUrl:
            celebrationProduct.slug === 'celebracao-30-anos-treinador-avancado'
              ? celebrationEtbImage
              : celebrationImage,
          stock: 10,
          status: 'published',
          isFeatured: celebrationProduct.slug === 'celebracao-30-anos-treinador-avancado',
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
