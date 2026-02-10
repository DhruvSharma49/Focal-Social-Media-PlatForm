// Mock data for Instagram clone

export const currentUser = {
  id: "current",
  username: "sharma_dhruv49",
  fullName: "Dhruv",
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  bio: "Digital creator | Photography enthusiast 📸",
  website: "linktr.ee/dhruv",
  postsCount: 42,
  followersCount: 1234,
  followingCount: 567,
  isVerified: false,
};

export const users = [
  { id: "1", username: "diceacademy", fullName: "DICE Academy", avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop", isVerified: true },
  { id: "2", username: "anushkasharma", fullName: "Anushka Sharma", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", isVerified: true },
  { id: "3", username: "shehnaazgill", fullName: "Shehnaaz Gill", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", isVerified: true },
  { id: "4", username: "ab.abhishek", fullName: "Abhishek", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", isVerified: false },
  { id: "5", username: "prithviduggal", fullName: "Prithvi Duggal", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", isVerified: false },
  { id: "6", username: "bhaveya_2", fullName: "Bhaveya", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", isVerified: false },
  { id: "7", username: "urvi_bansal", fullName: "Urvi Bansal | Career", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", isVerified: true },
  { id: "8", username: "animesh_mogha", fullName: "Animesh Mogha", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", isVerified: true },
];

export const stories = [
  { id: "1", userId: "1", username: "diceacade...", imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop", seen: false },
  { id: "2", userId: "2", username: "anushkase...", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", seen: false },
  { id: "3", userId: "3", username: "shehnaazgill", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", seen: false },
  { id: "4", userId: "4", username: "ab.abhishe...", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", seen: false },
  { id: "5", userId: "5", username: "prithvidug...", imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop", seen: false },
  { id: "6", userId: "6", username: "bhaveya_2...", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", seen: false },
  { id: "7", userId: "7", username: "tech_guru", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", seen: true },
];

export const posts = [
  {
    id: "1",
    userId: "1",
    username: "bhajanmarg_official",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    images: ["https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=600&fit=crop"],
    likes: 12453,
    caption: "Beautiful spiritual gathering 🙏 #blessed #spirituality",
    comments: [
      { id: "c1", username: "user1", text: "Amazing! 🔥", likes: 23 },
      { id: "c2", username: "user2", text: "So inspiring", likes: 12 },
    ],
    timeAgo: "54m",
    isVerified: true,
    audioLabel: "Original audio",
    saved: false,
    liked: false,
  },
  {
    id: "2",
    userId: "2",
    username: "travel_diaries",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    images: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=600&fit=crop"],
    likes: 8234,
    caption: "Adventure awaits! 🌍✈️ #travel #wanderlust",
    comments: [],
    timeAgo: "2h",
    isVerified: false,
    saved: false,
    liked: false,
  },
  {
    id: "3",
    userId: "3",
    username: "foodie_heaven",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop"],
    likes: 5621,
    caption: "Pizza night 🍕 Who else loves a good margherita?",
    comments: [],
    timeAgo: "3h",
    isVerified: true,
    saved: false,
    liked: false,
  },
];

export const exploreImages = [
  { id: "e1", imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop", isVideo: false },
  { id: "e2", imageUrl: "https://images.unsplash.com/photo-1682687221038-404670f09561?w=400&h=400&fit=crop", isVideo: true },
  { id: "e3", imageUrl: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=400&h=400&fit=crop", isVideo: false },
  { id: "e4", imageUrl: "https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?w=400&h=400&fit=crop", isVideo: false },
  { id: "e5", imageUrl: "https://images.unsplash.com/photo-1682695794947-17061dc284dd?w=400&h=400&fit=crop", isVideo: true },
  { id: "e6", imageUrl: "https://images.unsplash.com/photo-1682686581660-3693f0c588d2?w=400&h=400&fit=crop", isVideo: false },
  { id: "e7", imageUrl: "https://images.unsplash.com/photo-1682686580186-b55d2a91053c?w=400&h=400&fit=crop", isVideo: false },
  { id: "e8", imageUrl: "https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?w=400&h=400&fit=crop", isVideo: true },
  { id: "e9", imageUrl: "https://images.unsplash.com/photo-1682686581362-7c44ed38f21f?w=400&h=400&fit=crop", isVideo: false },
  { id: "e10", imageUrl: "https://images.unsplash.com/photo-1682687220015-186f63b8850a?w=400&h=400&fit=crop", isVideo: false },
  { id: "e11", imageUrl: "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?w=400&h=400&fit=crop", isVideo: false },
  { id: "e12", imageUrl: "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=400&h=400&fit=crop", isVideo: true },
];

export const reels = [
  {
    id: "r1",
    username: "dance_vibes",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    videoThumbnail: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=700&fit=crop",
    likes: 234500,
    comments: 1234,
    shares: 5678,
    audio: "Original Audio",
    caption: "Learn this new trending dance 💃 #dance #trending",
    isVerified: true,
  },
  {
    id: "r2",
    username: "comedy_central",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    videoThumbnail: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=700&fit=crop",
    likes: 89000,
    comments: 567,
    shares: 2345,
    audio: "Funny Sound - Creator",
    caption: "When your alarm goes off on Monday 😂",
    isVerified: false,
  },
  {
    id: "r3",
    username: "food_shorts",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    videoThumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=700&fit=crop",
    likes: 156000,
    comments: 890,
    shares: 3456,
    audio: "Cooking Beats",
    caption: "60 second pasta recipe 🍝 #food #recipe",
    isVerified: true,
  },
];

export const conversations = [
  {
    id: "m1",
    user: users[0],
    lastMessage: "Sent you a reel",
    time: "2h",
    unread: true,
    isActive: true,
  },
  {
    id: "m2",
    user: users[1],
    lastMessage: "Thanks for sharing! ❤️",
    time: "5h",
    unread: false,
    isActive: false,
  },
  {
    id: "m3",
    user: users[2],
    lastMessage: "Are you coming to the party?",
    time: "1d",
    unread: true,
    isActive: true,
  },
  {
    id: "m4",
    user: users[3],
    lastMessage: "Let me know when you're free",
    time: "2d",
    unread: false,
    isActive: false,
  },
  {
    id: "m5",
    user: users[4],
    lastMessage: "Nice pic! 📸",
    time: "3d",
    unread: false,
    isActive: false,
  },
];

export const notifications = [
  {
    id: "n1",
    type: "like",
    user: users[0],
    content: "liked your photo.",
    time: "2m",
    postImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=50&h=50&fit=crop",
  },
  {
    id: "n2",
    type: "follow",
    user: users[1],
    content: "started following you.",
    time: "1h",
  },
  {
    id: "n3",
    type: "comment",
    user: users[2],
    content: "commented: Amazing shot! 🔥",
    time: "3h",
    postImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=50&h=50&fit=crop",
  },
  {
    id: "n4",
    type: "mention",
    user: users[3],
    content: "mentioned you in a comment.",
    time: "5h",
    postImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=50&h=50&fit=crop",
  },
  {
    id: "n5",
    type: "like",
    user: users[4],
    content: "liked your reel.",
    time: "1d",
  },
];

export const profilePosts = [
  { id: "p1", imageUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop", likes: 234, comments: 12 },
  { id: "p2", imageUrl: "https://images.unsplash.com/photo-1682687221038-404670f09561?w=400&h=400&fit=crop", likes: 567, comments: 34 },
  { id: "p3", imageUrl: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=400&h=400&fit=crop", likes: 890, comments: 56 },
  { id: "p4", imageUrl: "https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?w=400&h=400&fit=crop", likes: 123, comments: 8 },
  { id: "p5", imageUrl: "https://images.unsplash.com/photo-1682695794947-17061dc284dd?w=400&h=400&fit=crop", likes: 456, comments: 23 },
  { id: "p6", imageUrl: "https://images.unsplash.com/photo-1682686581660-3693f0c588d2?w=400&h=400&fit=crop", likes: 789, comments: 45 },
];

export const savedPosts = [
  { id: "s1", imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop" },
  { id: "s2", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" },
  { id: "s3", imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop" },
];

export const taggedPosts = [
  { id: "t1", imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=400&fit=crop" },
  { id: "t2", imageUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=400&fit=crop" },
];
