import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Collection from '#models/collection'
import Product from '#models/product'
import PromotionalBanner from '#models/promotional_banner'

export default class extends BaseSeeder {
  async run() {
    const paldea = await Collection.updateOrCreate(
      { slug: 'destinos-de-paldea' },
      {
        name: 'Destinos de Paldea',
        description: 'Uma coleção vibrante para abrir, jogar e guardar.',
        sortOrder: 1,
        isPublished: true,
      }
    )
    const evolucoes = await Collection.updateOrCreate(
      { slug: 'evolucoes-em-paldea' },
      {
        name: 'Evoluções em Paldea',
        description: 'Uma jornada pelas evoluções que marcaram uma geração.',
        sortOrder: 2,
        isPublished: true,
      }
    )
    const classicos = await Collection.updateOrCreate(
      { slug: 'classicos-da-triade' },
      {
        name: 'Clássicos da Triade',
        description: 'Peças selecionadas para colecionadores.',
        sortOrder: 3,
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
  }
}
