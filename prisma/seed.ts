import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 12)
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@immaculatebaseball.com' },
    update: {},
    create: {
      email: 'admin@immaculatebaseball.com',
      passwordHash,
    },
  })
  console.log(`Admin user: ${admin.email}`)

  // Create camp weeks — summer 2026
  const campWeeks = [
    { name: 'Week 1', startDate: new Date('2026-06-08'), endDate: new Date('2026-06-12'), price: 35000, maxSpots: 30 },
    { name: 'Week 2', startDate: new Date('2026-06-15'), endDate: new Date('2026-06-19'), price: 35000, maxSpots: 30 },
    { name: 'Week 3', startDate: new Date('2026-06-22'), endDate: new Date('2026-06-26'), price: 35000, maxSpots: 30 },
    { name: 'Week 4', startDate: new Date('2026-06-29'), endDate: new Date('2026-07-02'), price: 28000, maxSpots: 30 },
    { name: 'Week 5', startDate: new Date('2026-07-06'), endDate: new Date('2026-07-10'), price: 35000, maxSpots: 30 },
    { name: 'Week 6', startDate: new Date('2026-07-13'), endDate: new Date('2026-07-17'), price: 35000, maxSpots: 30 },
    { name: 'Week 7', startDate: new Date('2026-07-20'), endDate: new Date('2026-07-24'), price: 35000, maxSpots: 30 },
    { name: 'Week 8', startDate: new Date('2026-07-27'), endDate: new Date('2026-07-31'), price: 35000, maxSpots: 30 },
  ]

  for (const week of campWeeks) {
    await prisma.campWeek.upsert({
      where: {
        id: `seed-${week.name.toLowerCase().replace(' ', '-')}`,
      },
      update: {
        price: week.price,
        maxSpots: week.maxSpots,
        endDate: week.endDate,
      },
      create: {
        id: `seed-${week.name.toLowerCase().replace(' ', '-')}`,
        ...week,
        isActive: true,
      },
    })
  }

  console.log(`Seeded ${campWeeks.length} camp weeks`)
  console.log('\nDone! Admin credentials:')
  console.log('  Email:    admin@immaculatebaseball.com')
  console.log('  Password: admin123')
  console.log('\nChange the admin password after first login.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
