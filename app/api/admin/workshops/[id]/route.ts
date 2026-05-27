import { NextRequest, NextResponse } from 'next/server'
import { getWorkshopById, updateWorkshop, deleteWorkshop } from '@/lib/admin-sheets'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ws = await getWorkshopById(id)
  if (!ws) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(ws)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await updateWorkshop(id, await req.json())
    return NextResponse.json({ success: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : '수정에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await deleteWorkshop(id)
    return NextResponse.json({ success: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : '삭제에 실패했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
