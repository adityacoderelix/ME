'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

async function connectToDatabase() {
  try {
    await client.connect()
    return client.db('majestic_escape')
  } catch (error) {
    console.error('Failed to connect to the database', error)
    throw error
  }
}

const listingSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  propertyType: z.string(),
  bedrooms: z.number().min(1),
  bathrooms: z.number().min(1),
  maxGuests: z.number().min(1),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  price: z.number().min(0),
  amenities: z.array(z.string()),
  images: z.array(z.string()),
  petsAllowed: z.enum(['yes', 'no']),
  checkInTime: z.string(),
  checkOutTime: z.string(),
  houseRules: z.string(),
  cancellationPolicy: z.string(),
  minimumStay: z.number().min(1),
})

export async function createListing(formData) {
  
  const userInfo = JSON.parse(formData.get('userInfo') )
  const hostId = userInfo?.userId

  if (!hostId) {
    throw new Error('Host ID not found')
  }

  const validatedFields = listingSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    propertyType: formData.get('propertyType'),
    bedrooms: Number(formData.get('bedrooms')),
    bathrooms: Number(formData.get('bathrooms')),
    maxGuests: Number(formData.get('maxGuests')),
    address: formData.get('address'),
    city: formData.get('city'),
    state: formData.get('state'),
    zipcode: formData.get('zipcode'),
    price: Number(formData.get('price')),
    amenities: formData.getAll('amenities'),
    images: formData.getAll('images'),
    petsAllowed: formData.get('petsAllowed'),
    checkInTime: formData.get('checkInTime'),
    checkOutTime: formData.get('checkOutTime'),
    houseRules: formData.get('houseRules'),
    cancellationPolicy: formData.get('cancellationPolicy'),
    minimumStay: Number(formData.get('minimumStay')),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid form data' }
  }

  const listingData = {
    ...validatedFields.data,
    hostId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  try {
    const db = await connectToDatabase()
    const result = await db.collection('property-listings').insertOne(listingData)

    if (result.acknowledged) {
      revalidatePath('/listings')
      redirect('/listings')
    } else {
      return { error: 'Failed to create listing' }
    }
  } catch (error) {
    console.error('Error creating listing:', error)
    return { error: 'An error occurred while creating the listing' }
  } finally {
    await client.close()
  }
}