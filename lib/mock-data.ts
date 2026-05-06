// Mock data store for the application
export interface User {
  id: string
  email: string
  name: string
  role: "client" | "designer" | "admin"
  avatar?: string
  bio?: string
  following: string[]
  followers: string[]
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  text: string
  createdAt: string
}

export interface Post {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  imageUrl: string
  caption: string
  tags: string[]
  style: string
  roomType: string
  likes: number
  likedBy: string[]
  savedBy: string[]
  viewCount: number
  comments: Comment[]
  shares: number
  isAIGenerated: boolean
  createdAt: string
}

export interface Design {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  title: string
  description: string
  imageUrl: string
  style: string
  likes: number
  likedBy: string[]
  savedBy: string[]
  isPremium: boolean
  price?: number
  createdAt: string
}

export interface Collection {
  id: string
  userId: string
  name: string
  description?: string
  designIds: string[]
  createdAt: string
}

export interface UserProfile extends User {
  interactionHistory: {
    likedDesigns: string[]
    savedDesigns: string[]
    viewedDesigns: string[]
  }
  paymentHistory: {
    id: string
    amount: number
    description: string
    date: string
    status: string
  }[]
}

// Current logged in user (for demo purposes)
let currentUser: User | null = {
  id: "1",
  email: "demo@example.com",
  name: "Demo User",
  role: "client",
  following: ["2", "3"],
  followers: [],
}

// Mock users
export const mockUsers: User[] = [
  currentUser,
  {
    id: "2",
    email: "designer1@example.com",
    name: "Sarah Johnson",
    role: "designer",
    avatar: "/female-designer.png",
    bio: "Minimalist interior designer with 10+ years of experience",
    following: [],
    followers: ["1"],
  },
  {
    id: "3",
    email: "designer2@example.com",
    name: "Michael Chen",
    role: "designer",
    avatar: "/male-designer.png",
    bio: "Specializing in industrial and modern spaces",
    following: [],
    followers: ["1"],
  },
]

// Mock posts (social feed)
export const mockPosts: Post[] = [
  {
    id: "p1",
    userId: "2",
    userName: "Sarah Johnson",
    userAvatar: "/female-designer.png",
    imageUrl: "/minimalist-living-room.png",
    caption: "Just finished this beautiful minimalist living room transformation! The secret is in the lighting and negative space. What do you think? ✨",
    tags: ["minimalist", "livingroom", "renovation", "design"],
    style: "minimalist",
    roomType: "living room",
    likes: 234,
    likedBy: ["1"],
    savedBy: ["1"],
    viewCount: 1240,
    comments: [
      {
        id: "c1",
        userId: "1",
        userName: "Demo User",
        text: "This is stunning! Love the simplicity.",
        createdAt: new Date().toISOString(),
      },
    ],
    shares: 42,
    isAIGenerated: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "p2",
    userId: "3",
    userName: "Michael Chen",
    userAvatar: "/male-designer.png",
    imageUrl: "/industrial-kitchen.png",
    caption: "AI-generated industrial kitchen design concept. Love how the algorithm captured the raw, edgy vibe! Would you renovate your kitchen like this?",
    tags: ["industrial", "kitchen", "ai-design", "modernloft"],
    style: "industrial",
    roomType: "kitchen",
    likes: 567,
    likedBy: [],
    savedBy: [],
    viewCount: 3420,
    comments: [],
    shares: 89,
    isAIGenerated: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "p3",
    userId: "2",
    userName: "Sarah Johnson",
    userAvatar: "/female-designer.png",
    imageUrl: "/scandinavian-bedroom.png",
    caption: "Scandinavian hygge at its finest 🛏️ Warm woods, soft textures, and that perfect cozy vibe. Who else is obsessed with this aesthetic?",
    tags: ["scandinavian", "bedroom", "hygge", "cozy"],
    style: "scandinavian",
    roomType: "bedroom",
    likes: 892,
    likedBy: ["1"],
    savedBy: ["1"],
    viewCount: 5120,
    comments: [
      {
        id: "c2",
        userId: "3",
        userName: "Michael Chen",
        userAvatar: "/male-designer.png",
        text: "The texture work here is *chef's kiss*",
        createdAt: new Date().toISOString(),
      },
    ],
    shares: 156,
    isAIGenerated: false,
    createdAt: new Date().toISOString(),
  },
]

// Mock designs
export const mockDesigns: Design[] = [
  {
    id: "1",
    userId: "2",
    userName: "Sarah Johnson",
    userAvatar: "/female-designer.png",
    title: "Minimalist Living Room",
    description: "Clean lines and neutral tones create a serene space",
    imageUrl: "/minimalist-living-room.png",
    style: "minimalist",
    likes: 42,
    likedBy: [],
    savedBy: [],
    isPremium: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "3",
    userName: "Michael Chen",
    userAvatar: "/male-designer.png",
    title: "Industrial Loft Kitchen",
    description: "Exposed brick and metal accents for an urban feel",
    imageUrl: "/industrial-kitchen.png",
    style: "industrial",
    likes: 38,
    likedBy: [],
    savedBy: [],
    isPremium: true,
    price: 49.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    userId: "2",
    userName: "Sarah Johnson",
    userAvatar: "/female-designer.png",
    title: "Scandinavian Bedroom",
    description: "Cozy and functional with natural materials",
    imageUrl: "/scandinavian-bedroom.png",
    style: "scandinavian",
    likes: 56,
    likedBy: ["1"],
    savedBy: ["1"],
    isPremium: false,
    createdAt: new Date().toISOString(),
  },
]

// Mock collections
export const mockCollections: Collection[] = [
  {
    id: "1",
    userId: "1",
    name: "My Dream Living Room",
    description: "Ideas for my living room renovation",
    designIds: ["1", "3"],
    createdAt: new Date().toISOString(),
  },
]

// Get current user
export function getCurrentUser(): User | null {
  return currentUser
}

// Set current user (for login/logout)
export function setCurrentUser(user: User | null) {
  currentUser = user
}

// Get all designs
export function getDesigns(filters?: { style?: string; search?: string; userId?: string }): Design[] {
  let filtered = [...mockDesigns]

  if (filters?.style && filters.style !== "all") {
    filtered = filtered.filter((d) => d.style === filters.style)
  }

  if (filters?.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (d) => d.title.toLowerCase().includes(search) || d.description.toLowerCase().includes(search),
    )
  }

  if (filters?.userId) {
    filtered = filtered.filter((d) => d.userId === filters.userId)
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Toggle like on design
export function toggleLike(designId: string, userId: string): Design | null {
  const design = mockDesigns.find((d) => d.id === designId)
  if (!design) return null

  const index = design.likedBy.indexOf(userId)
  if (index > -1) {
    design.likedBy.splice(index, 1)
    design.likes--
  } else {
    design.likedBy.push(userId)
    design.likes++
  }

  return design
}

// Toggle save on design
export function toggleSave(designId: string, userId: string): Design | null {
  const design = mockDesigns.find((d) => d.id === designId)
  if (!design) return null

  const index = design.savedBy.indexOf(userId)
  if (index > -1) {
    design.savedBy.splice(index, 1)
  } else {
    design.savedBy.push(userId)
  }

  return design
}

// Get saved designs for user
export function getSavedDesigns(userId: string): Design[] {
  return mockDesigns.filter((d) => d.savedBy.includes(userId))
}

// Get user by id
export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id)
}

// Get designers
export function getDesigners(): User[] {
  return mockUsers.filter((u) => u.role === "designer")
}

// Toggle follow
export function toggleFollow(designerId: string, userId: string): boolean {
  const user = mockUsers.find((u) => u.id === userId)
  const designer = mockUsers.find((u) => u.id === designerId)

  if (!user || !designer) return false

  const followingIndex = user.following.indexOf(designerId)
  const followerIndex = designer.followers.indexOf(userId)

  if (followingIndex > -1) {
    user.following.splice(followingIndex, 1)
    designer.followers.splice(followerIndex, 1)
    return false
  } else {
    user.following.push(designerId)
    designer.followers.push(userId)
    return true
  }
}

// Add new design
export function addDesign(design: Omit<Design, "id" | "likes" | "likedBy" | "savedBy" | "createdAt">): Design {
  const newDesign: Design = {
    ...design,
    id: String(mockDesigns.length + 1),
    likes: 0,
    likedBy: [],
    savedBy: [],
    createdAt: new Date().toISOString(),
  }
  mockDesigns.unshift(newDesign)
  return newDesign
}

export function getUserCollections(userId: string): Collection[] {
  return mockCollections.filter((c) => c.userId === userId)
}

export function addCollection(collection: Omit<Collection, "id" | "createdAt">): Collection {
  const newCollection: Collection = {
    ...collection,
    id: String(mockCollections.length + 1),
    createdAt: new Date().toISOString(),
  }
  mockCollections.push(newCollection)
  return newCollection
}

export function updateCollection(id: string, updates: Partial<Collection>): Collection | null {
  const collection = mockCollections.find((c) => c.id === id)
  if (!collection) return null
  Object.assign(collection, updates)
  return collection
}

export function deleteCollection(id: string): boolean {
  const index = mockCollections.findIndex((c) => c.id === id)
  if (index === -1) return false
  mockCollections.splice(index, 1)
  return true
}

export function getUserProfile(userId: string): UserProfile | null {
  const user = mockUsers.find((u) => u.id === userId)
  if (!user) return null

  return {
    ...user,
    interactionHistory: {
      likedDesigns: mockDesigns.filter((d) => d.likedBy.includes(userId)).map((d) => d.id),
      savedDesigns: mockDesigns.filter((d) => d.savedBy.includes(userId)).map((d) => d.id),
      viewedDesigns: ["1", "2", "3"],
    },
    paymentHistory: [
      {
        id: "1",
        amount: 49.99,
        description: "Premium Design - Industrial Loft Kitchen",
        date: "2025-01-15",
        status: "completed",
      },
    ],
  }
}

export function updateUserProfile(userId: string, updates: Partial<User>): User | null {
  const user = mockUsers.find((u) => u.id === userId)
  if (!user) return null
  Object.assign(user, updates)
  if (currentUser?.id === userId) {
    currentUser = user
  }
  return user
}

// Post-related functions
export function getPosts(filters?: { style?: string; roomType?: string; userIds?: string[] }): Post[] {
  let filtered = [...mockPosts]

  if (filters?.style && filters.style !== "all") {
    filtered = filtered.filter((p) => p.style === filters.style)
  }

  if (filters?.roomType && filters.roomType !== "all") {
    filtered = filtered.filter((p) => p.roomType === filters.roomType)
  }

  if (filters?.userIds && filters.userIds.length > 0) {
    filtered = filtered.filter((p) => filters.userIds!.includes(p.userId))
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function togglePostLike(postId: string, userId: string): Post | null {
  const post = mockPosts.find((p) => p.id === postId)
  if (!post) return null

  const index = post.likedBy.indexOf(userId)
  if (index > -1) {
    post.likedBy.splice(index, 1)
    post.likes--
  } else {
    post.likedBy.push(userId)
    post.likes++
  }

  return post
}

export function togglePostSave(postId: string, userId: string): Post | null {
  const post = mockPosts.find((p) => p.id === postId)
  if (!post) return null

  const index = post.savedBy.indexOf(userId)
  if (index > -1) {
    post.savedBy.splice(index, 1)
  } else {
    post.savedBy.push(userId)
  }

  return post
}

export function addPostComment(postId: string, comment: Omit<Comment, "id" | "createdAt">): Post | null {
  const post = mockPosts.find((p) => p.id === postId)
  if (!post) return null

  const newComment: Comment = {
    ...comment,
    id: String(post.comments.length + 1),
    createdAt: new Date().toISOString(),
  }
  post.comments.push(newComment)
  return post
}

export function sharePost(postId: string): Post | null {
  const post = mockPosts.find((p) => p.id === postId)
  if (!post) return null
  post.shares++
  return post
}

export function incrementPostView(postId: string): Post | null {
  const post = mockPosts.find((p) => p.id === postId)
  if (!post) return null
  post.viewCount++
  return post
}

export function addPost(post: Omit<Post, "id" | "likes" | "likedBy" | "savedBy" | "viewCount" | "comments" | "shares" | "createdAt">): Post {
  const newPost: Post = {
    ...post,
    id: String(mockPosts.length + 1),
    likes: 0,
    likedBy: [],
    savedBy: [],
    viewCount: 0,
    comments: [],
    shares: 0,
    createdAt: new Date().toISOString(),
  }
  mockPosts.unshift(newPost)
  return newPost
}

export function getSavedPosts(userId: string): Post[] {
  return mockPosts.filter((p) => p.savedBy.includes(userId))
}

export function getUserPosts(userId: string): Post[] {
  return mockPosts.filter((p) => p.userId === userId)
}
