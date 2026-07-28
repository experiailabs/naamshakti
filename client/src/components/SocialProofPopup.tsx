import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, X, MapPin } from "lucide-react";

// ============================================================
// Social Proof Popup — recurring "recent purchase" notifications
// Shows random Indian names + cities to build social proof
// ============================================================

interface PurchaseNotification {
  name: string;
  city: string;
  timeAgo: string;
  objective: string;
}

const INDIAN_NAMES = [
  "Rahul Sharma", "Priya Patel", "Amit Kumar", "Sneha Reddy", "Vikram Singh",
  "Anjali Gupta", "Rajesh Verma", "Pooja Iyer", "Arjun Nair", "Deepika Joshi",
  "Suresh Yadav", "Kavita Rao", "Manish Agarwal", "Neha Chauhan", "Sanjay Mehta",
  "Ritu Saxena", "Ashok Pillai", "Meera Desai", "Karan Malhotra", "Shreya Bose",
  "Ramesh Chandra", "Lakshmi Menon", "Gaurav Tiwari", "Anita Bhat", "Siddharth Jain",
  "Divya Shetty", "Harish Khanna", "Tanvi Kulkarni", "Naveen Reddy", "Sapna Mishra",
  "Aditya Chopra", "Bhavya Nanda", "Rohit Bansal", "Falguni Trivedi", "Yash Goel",
  "Ishaan Kapoor", "Riya Choudhary", "Tarun Sinha", "Nisha Agnihotri", "Devansh Shah",
  "Vivek Bhatia", "Swati Kaur", "Nikhil Rastogi", "Preeti Bakshi", "Mohit Arora",
  "Sunita Dubey", "Prakash Pandey", "Rekha Thakur", "Vinod Khatri", "Aarti Sood",
  "Abhishek Rawat", "Nandini Kohli", "Dinesh Ghosh", "Shalini Sharma", "Pankaj Mittal",
  "Geeta Chawla", "Rakesh Ahluwalia", "Vandana Sethi", "Alok Bajaj", "Sarika Menon",
  "Kunal Vora", "Priyanka Deshmukh", "Sameer Qureshi", "Madhavi Iyer", "Anil Kapoor",
  "Roshni Basak", "Vishal Oberoi", "Kirti Ramanathan", "Girish Nayak", "Sonal Warrior",
  "Ajay Chandel", "Manisha Kar", "Ravi Talwar", "Jyoti Bhalla", "Vinay Chatterjee",
  "Poonam Sarin", "Deepak Bhardwaj", "Renu Dutta", "Ankit Solanki", "Shweta Panda",
  "Manoj Tandon", "Archana Bal", "Rajiv Anand", "Uma Subramaniam", "Sunil Bhatt",
  "Nidhi Vaidya", "Ramesh Iyengar", "Kalpana Divekar", "Gopal Krishnan", "Sarita Bora",
  "Vikas Handa", "Chitra Balakrishnan", "Anand Swaminathan", "Rupal Thakkar", "Sachin Puri",
  "Meenakshi Iyer", "Yogesh Sarkar", "Indira Chakraborty", "Parth Vyas", "Leela Ramesh",
];

const INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Bhopal", "Indore", "Surat",
  "Nagpur", "Kochi", "Coimbatore", "Patna", "Vadodara", "Visakhapatnam",
  "Gurugram", "Noida", "Ranchi", "Guwahati", "Amritsar", "Varanasi", "Raipur",
  "Mysuru", "Faridabad", "Rajkot", "Thiruvananthapuram", "Ludhiana", "Nashik",
  "Vijayawada", "Madurai", "Jodhpur", "Agra", "Dehradun", "Shimla", "Siliguri",
];

const OBJECTIVES = [
  "Career Growth", "Wealth Attraction", "Love & Relationships", "Business Success",
  "Health & Wellbeing", "Education", "Personal Confidence", "Marriage & Family",
];

const TIME_AGOS = [
  "2 minutes ago", "5 minutes ago", "just now", "1 minute ago",
  "3 minutes ago", "7 minutes ago", "10 minutes ago", "4 minutes ago",
  "6 minutes ago", "8 minutes ago", "12 minutes ago", "15 minutes ago",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNotification(): PurchaseNotification {
  return {
    name: getRandomItem(INDIAN_NAMES),
    city: getRandomItem(INDIAN_CITIES),
    timeAgo: getRandomItem(TIME_AGOS),
    objective: getRandomItem(OBJECTIVES),
  };
}

export default function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [notification, setNotification] = useState<PurchaseNotification | null>(null);

  const showNotification = useCallback(() => {
    if (dismissed) return;
    setNotification(generateNotification());
    setVisible(true);
    // Auto-hide after 5 seconds
    setTimeout(() => setVisible(false), 5000);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // First popup after 4 seconds
    const firstTimer = setTimeout(showNotification, 4000);

    // Recurring popups every 15-25 seconds
    let recurringTimer: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 10000; // 15-25s
      recurringTimer = setTimeout(() => {
        showNotification();
        scheduleNext();
      }, delay);
    };
    scheduleNext();

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(recurringTimer);
    };
  }, [dismissed, showNotification]);

  if (dismissed || !notification) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
      style={{ maxWidth: "320px" }}
    >
      <div className="card-premium rounded-xl p-3.5 shadow-2xl border-primary/30 glow-saffron">
        <div className="flex items-start gap-3">
          {/* Avatar circle with check icon */}
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground leading-snug">
              <span className="font-semibold text-primary">{notification.name}</span>{" "}
              from{" "}
              <span className="flex items-center gap-0.5 inline-flex">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-foreground/80">{notification.city}</span>
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              just purchased a NaamShakti Report for{" "}
              <span className="text-primary/90 font-medium">{notification.objective}</span>
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-xs text-muted-foreground">{notification.timeAgo}</span>
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              <span className="text-xs text-primary font-medium">₹299</span>
              <span className="w-1 h-1 rounded-full bg-primary/40" />
              <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3 text-primary/60" />
                Verified
              </span>
            </div>
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setDismissed(true)}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
