'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NoticeBoxProps {
  isOpen: boolean
  onClose: () => void
}

export default function NoticeBox({ isOpen, onClose }: NoticeBoxProps) {
  const router = useRouter()
  const [isDomain, setIsDomain] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.hostname
      console.log(currentUrl)
      setIsDomain(currentUrl === 'btecpictcalculator.vercel.app')
      if (currentUrl === 'btecpictcalculator.vercel.app') {
        // redirect to the new domain using next/navigation
        router.push('https://btec-calculator.savenko.tech')
      }
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-[425px] px-4">
        <DialogHeader>
          <DialogTitle>Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isDomain && (
            <Alert variant="default">
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You're using the old domain! 
                  <br/><br/>
                We've migrated to the{' '}
                <Link href="https://btec-calculator.savenko.tech" className="font-medium underline underline-offset-4">
                  btec-calculator.savenko.tech
                </Link>{' '}
                domain. Please update your bookmarks, however, you can still use the current domain.
              </AlertDescription>
            </Alert>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">Credits</h3>
            <p className="text-sm text-foreground">
              All the work is done by Ihor Savenko <br/>
              ( <Link href="https://github.com/denver-code/btecpictcalculator/" className="font-medium underline underline-offset-4">
                denver-code
              </Link> | <Link href="https://savenko.tech" className="font-medium underline underline-offset-4">
                savenko.tech
              </Link> )<br />
              Email: <Link href="mailto:csigorek@gmail.com" className="font-medium underline underline-offset-4">
                csigorek@gmail.com
              </Link> or <Link href="mailto:ihor@savenko.tech" className="font-medium underline underline-offset-4">
                ihor@savenko.tech
              </Link><br />
              Let me know if you have any questions or suggestions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Sharing</h3>
            <p className="text-sm text-foreground">
              You can share your results with your friends, teachers or simply save it for later by copying the link
              from the address bar.<br /><br />
              We utilize token-based sharing, so you can share your results without any personal
              data being shared nor saving any information on the server side.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Source of data</h3>
            <p className="text-sm text-foreground">
              Data is taken from BTEC Pearson L3 ICT specification that you can find{' '}
              <Link href="https://github.com/denver-code/btecpictcalculator/blob/main/specification-pearson-btec-level-3-national-extended-certificate-in-information-technology.pdf" className="font-medium underline underline-offset-4 inline-flex items-center">
                here
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>. But if it's changed or some data is incorrect, please let us know via issues on GitHub.<br /><br />
              <Link href="https://github.com/denver-code/btecpictcalculator/issues" className="font-medium underline underline-offset-4 inline-flex items-center">
                Report an issue
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </p>
          </div>

           <div>
            <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
            <p className="text-sm text-foreground">
                Made with ❤️ using Next.js, Tailwind CSS, Shadcn/ui, TypeScript, Cloudflare, Github and Vercel.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}