"use client"
import Hero from '@/components/experience-hero';
import Blogs from '@/components/blogs';
import Newsletter from "@/components/newsletter";
import { ExpHero } from '@/components/exp-hero';
// import ExperienceSection from '@/components/experiences/experience-section';
// import ExperienceSoulTraveling from '@/components/experiences/experience-soul-traveling';

export default function Component() {
    return (
            <div>
            <ExpHero/>
                <Hero /> 
                {/* <ExperienceSection/> */}
                {/* <ExperienceSoulTraveling/> */}
                <Blogs />
                <Newsletter />
            </div>
    );
}