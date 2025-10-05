import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
    className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {

    return (
        <section className={`bg-gradient-to-r pb-4 w-full flex flex-col from-primary/20 to-primary/80 ${className}`}>

            <div className="flex flex-col p-1 overflow-hidden gap-8">
                {/* top content */}
                <div className='flex justify-between h-[400px] w-full'>

                    <div className="mt-16 text-primary-foreground gap-20 max-w-1/3 pl-8 md:pl-12 lg:pl-16">
                        <h1 className="text-2xl text-foreground md:text-3xl lg:text-5xl font-bold leading-tight">
                            Prenez facilement vos <br/>
                            <span>rendez-vous</span> 

                            <span className="text-foreground/80"> en ligne</span> avec <span className="text-foreground/70">MedEasy </span> 
                        </h1>
                    </div>

                    {/* gauche  */}
                    <div className='flex-1 flex w-full border rounded-md h-full'>
                        {/* <Image src="/hero.jpg" alt="Description de l'image" width={100} height={200} className="object-cover rounded-lg w-full h-auto" /> */}
                    </div>
                </div>

    
            </div>
        </section>
    );
};

export default HeroSection;